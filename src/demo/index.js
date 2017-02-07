const Player = require('../core/player');
const shell = require('./utils/shell');
const sets = require('../games/sets');
const Scopa = require('../games/scopa');

const game = new Scopa(sets);

game.addPlayer(new Player('Mario'));
game.addPlayer(new Player('Nicola'));
game.addPlayer(new Player('Giuseppe'));

game.on('start', shell.handleStart);
game.on('turn', shell.handleTurn);
game.on('hand', shell.handleHand);
game.on('end', shell.handleEnd);

game.startGame();
