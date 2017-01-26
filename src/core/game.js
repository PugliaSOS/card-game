const events = require('./events');
const Deck = require('./deck');

class Game {
  constructor(sets, rules) {
    this.direction = 1;
    this.turn = 0;
    this.hand = 0;
    this.players = [];
    this.table = new Deck();
    this.deck = new Deck(sets.naples);
    this.on = events.on;
    this.rules = rules;
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
    this.rules.startGame(this);
    this.startHand();
  }

  startHand() {
    if (this.rules.isOver(this)) {
      return this.end();
    }

    this.fire('hand');
    this.rules.startHand(this);
    this.startTurn();
  }

  startTurn() {
    if (this.rules.isOver(this)) {
      return this.end();
    }

    this.rules.startTurn(this);
    this.fire('turn');
  }

  end() {
    this.rules.endMetch(this);
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
    this.rules.playCard(this, { card });
  }
}

module.exports = Game;
