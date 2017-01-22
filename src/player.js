const Deck = require('./deck');

class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Deck(3);
  }
}

module.exports = Player;
