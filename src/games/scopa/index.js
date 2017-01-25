const getCombinations = arr => {
  if (arr.length < 2) { return [arr]; }
  const sub = getCombinations(arr.slice(1));
  return [
    [arr[0]],
    ...sub.map(c => [arr[0], ...c]),
    ...sub
  ];
}

const evaluatePossibilities = (game, choice) => {
  let possibilities = game.table.cards
    .filter(c => c.value === choice.value)
    .map(c => [c]);
  if (!possibilities.length) {
    possibilities = getCombinations(game.table.cards)
      .filter(c => c.reduce((a,b) => a.value + b.value, 0) === choice.value)
  }
  return possibilities;
}

const startHand = game => {
  if (game.currentPlayer.hand.isEmpty()) {
    game.players.forEach(p => {
      [...new Array(3)].forEach(_ => p.hand.add(game.deck.draw()));
    });
  }
}

const isOver = game => {
  return game.currentPlayer.hand.isEmpty() && game.deck.isEmpty();
}

const startGame = game => {
  game.deck.mix();
  startHand(game);
  [...new Array(4)].forEach(_ => game.table.add(game.deck.draw()));
}

const playCard = (game, choice) => {
  const card = game.currentPlayer.hand.pick(choice.card);
  const possibilities = evaluatePossibilities(game, card);
  if (possibilities.length) {
    possibilities[0].forEach(c => {
      game.currentPlayer.score.add(game.table.pick(c));
    });
    game.currentPlayer.score.add(choice.card);

    if (game.table.isEmpty() && !game.deck.isEmpty()) {
      game.currentPlayer.scopa++;
    }

  } else {
    game.table.add(card);
  }
}

const getScore = (card, type) => {
  switch (type) {
    case 'primiera':
      return [16, 12, 13, 14, 15, 18, 21, 10, 10, 10][card.value - 1];
    case 'denari':
      return card.seed === 'D' ? 1 : 0;
    case 'settebello':
      return (card.seed === 'D' && card.value === 7) ? 1 : 0;
  }
  return 1;
}

const endMetch = game => {
  ['lunga', 'denari', 'settebello'].forEach(t => {
    const scores = game.players.map(p => {
      return p.score.cards.reduce((acc, c) => acc + getScore(c, t), 0);
    });

    const maxScore = Math.max.apply(Math, scores);
    if (scores.filter(v => v === maxScore).length === 1) {
      game.players[scores.indexOf(maxScore)].points++;
    }
  });

  // Primiera
  const primieraScores = game.players.map(p => {
    return 'DCSB'.split('')
      .map(seed => {
        return Math.max.apply(
          null,
          p.score.cards
            .filter(c => c.seed === seed)
            .map(c => getScore(c, 'primiera'))
        );
      })
      .reduce((a, b) => a + b, 0);
  });
  const primieraMaxScore = Math.max.apply(Math, primieraScores);
  if (primieraScores.filter(v => v === primieraMaxScore).length === 1) {
    game.players[primieraScores.indexOf(primieraMaxScore)].points++;
  }

  // Scopa
  game.players.forEach(p => p.points += p.scopa)
}

const startTurn = game => {}

module.exports = { startTurn, startGame, startHand, playCard, endMetch, isOver };
