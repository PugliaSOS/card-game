const events = require('./events');
const Deck = require('./deck');

class Game {
  constructor(sets)  {
    this.direction = 1;
    this.turn = 0;
    this.hand = 0;
    this.players = [];
    this.table = new Deck();
    this.deck = new Deck(sets.naples);
    this.on = events.on;
    this.start = this.startGame;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  get currentPlayer() {
    return this.players[this.turn];
  }

  startGame() {
    this.fire('start');
    this.startHand();
  }

  startHand() {
    if (this.isOver()) {
      return this.end();
    }

    this.fire('hand');
    this.startTurn();
  }

  startTurn() {
    if (this.isOver()) {
      return this.end();
    }

    this.fire('turn');
  }

  end() {
    this.endMetch();
    this.fire('end');
  }

  move(choice) {
    this.doSmth(choice);
    this.turn += 1;

    if (this.turn >= this.players.length) {
      this.turn = 0;
      this.hand += 1;
      this.startHand();
    } else {
      this.startTurn();
    }
  }

  fire(e) {
    events.fire(e, this);
  }

  doSmth(choice) {
    const card = choice;
    this.playCard({ card });
  }
}

module.exports = Game;
