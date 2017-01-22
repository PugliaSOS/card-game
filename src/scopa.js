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
  game.table.add(game.currentPlayer.hand.pick(choice.card));
}

const startTurn = game => {}

module.exports = { startTurn, startGame, startHand, playCard };
