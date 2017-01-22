const read = require('read');

const handleStart = (game) => {
  console.log();
  console.log('# Game has started');
}

const handleHand = (game) => {
  console.log();
  console.log('## Next hand');
}

const handleTurn = (game) => {
  console.log();
  console.log(`## Now is ${game.currentPlayer.name}'s turn`);
  console.log('The following cards are on the table:');
  console.log(game.table.cards.map(c => c.toString()));
  console.log('The following cards are in your hand:');
  console.log(game.currentPlayer.hand.cards.map(c => c.toString()));
  console.log('Which card do you choose? (Give index)');
  read({
    prompt: '>'
  }, (err, choice) => {
    game.move(Number(choice - 1));
  })
}

module.exports = { handleTurn, handleStart, handleHand };
