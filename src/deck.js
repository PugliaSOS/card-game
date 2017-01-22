const Card = require('./card');

class Deck {
  constructor(set) {
    this.cards = set;
  }

  mix(times) {
    const temp = [];
    while (this.cards.length) {
      const position = Math.random() * this.cards.length;
      temp.push(this.cards.splice(position, 1)[0]);
    }
    this.cards = temp;
  }
}

module.exports = Deck;
