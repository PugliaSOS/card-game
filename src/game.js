const events = require('./events');
const Deck = require('./deck');

class Game {
  constructor() {
    this.direction = 1;
    this.turn = 0;
    this.hand = 0;
    this.players = [];
    this.table = new Deck(4);
    this.on = events.on;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  get currentPlayer() {
    return this.players[this.turn];
  }

  start() {
    this.fire('start');
    this.fire('hand');
    this.fire('turn');
  }

  move(choice) {
    this.doSmth(choice);
    this.turn++;
    if (this.turn >= this.players.length) {
      this.turn = 0;
      this.hand++;
      this.fire('hand');
    }
    this.fire('turn');
  }

  fire(e) {
    events.fire(e, this);
  }

  doSmth(choice) {}
}

module.exports = Game;
