const read = require('read');

const handleStart = (game) => {
    console.log('Game has started');
}

const handleTurn = (game) => {
    console.log(`Now is ${game.currentPlayer.name}'s turn`);
}

const handleHand = (game) => {
    console.log('The following cards are on the table:');
    console.log(game.table.cards.map(c => c.toString()));
    console.log('The following cards are in your hand:');
    console.log(game.currentPlayer.hand.cards.map(c => c.toString()));
    console.log('Which card do you choose? (Give index)');
}
