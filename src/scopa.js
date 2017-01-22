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
      .filter(c => c.reduce((a,b) => a.value + b.value) === choice.value)
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

const startGame = game => {
  game.deck.mix();
  startHand(game);
  [...new Array(4)].forEach(_ => game.table.add(game.deck.draw()));
}

const playCard = (game, choice) => {
  const card = game.currentPlayer.hand.pick(choice.card);
  const possibilities = evaluatePossibilities(game, card);
  if (possibilities.length) {
    console.log('possibilities: ', possibilities)
    possibilities[0].forEach(c => {
      game.currentPlayer.score.add(game.table.pick(c));
    });
    game.currentPlayer.score.add(choice.card);
  } else {
    game.table.add(card);
  }
}

const startTurn = game => {}

module.exports = { startTurn, startGame, startHand, playCard, getCombinations };
