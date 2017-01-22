const Deck = require('./deck');

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Deck();
    this.score = new Deck();
  }
}

module.exports = Player;
