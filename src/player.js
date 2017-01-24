const Deck = require('./deck');

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Deck();
    this.score = new Deck();
    this.points = 0;
    this.scopa = 0;
  }
}

module.exports = Player;
