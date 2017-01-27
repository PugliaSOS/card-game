/* eslint no-console: off */
// const read = require('read');

const handleStart = () => {
  console.log();
  console.log('# Game has started');
};

const handleHand = () => {
  console.log();
  console.log('## Next hand');
};

const handleTurn = (game) => {
  const getCard = index => game.currentPlayer.hand.cards[index - 1];

  console.log();
  console.log(`## Now is ${game.currentPlayer.name}'s turn`);
  console.log('The following cards are on the table:');
  console.log(game.table.cards.map(c => c.toString()));
  console.log('The following cards are in your hand:');
  console.log(game.currentPlayer.hand.cards.map(c => c.toString()));
  console.log('Which card do you choose? (Give index)');

  // read({
  //   prompt: '>'
  // }, (err, choice) => {
  //   game.move(Number(choice - 1));
  // })
  game.move(getCard(1));
};

const handleEnd = (game) => {
  console.log();
  console.log('Game over');
  game.players.forEach(p => console.log(`${p.name}'s score: ${p.points}`));
  console.log('######');
};

module.exports = { handleTurn, handleStart, handleHand, handleEnd };
