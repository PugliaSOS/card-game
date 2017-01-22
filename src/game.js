const events = require('./events');
const Deck = require('./deck');
const sets = require('./sets');
const rules = require('./scopa');

class Game {
  constructor() {
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
    rules.startGame(this);
    this.startHand();
  }

  startHand() {
    if (rules.isOver(this)) {
      return this.end();
    }
    this.fire('hand');
    rules.startHand(this);
    this.startTurn();
  }

  startTurn() {
    if (rules.isOver(this)) {
      return this.end();
    }
    rules.startTurn(this);
    this.fire('turn');
  }

  end() {
    this.fire('end');
  }

  move(choice) {
    this.doSmth(choice);
    this.turn++;
    if (this.turn >= this.players.length) {
      this.turn = 0;
      this.hand++;
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
    rules.playCard(this, { card });
  }
}

module.exports = Game;
