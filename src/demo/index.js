const Game = require('../core/game');
const Player = require('../core/player');
const shell = require('./utils/shell');

const game = new Game();

game.addPlayer(new Player('Mario'));
game.addPlayer(new Player('Nicola'));
game.addPlayer(new Player('Giuseppe'));

game.on('start', shell.handleStart);
game.on('turn', shell.handleTurn);
game.on('hand', shell.handleHand)
game.on('end', shell.handleEnd)

game.start();
