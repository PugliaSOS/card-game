const Card = require('./card');

class Deck {
  constructor(set = []) {
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

  draw() {
    return this.pick();
  }

  add(card) {
    return this.cards.push(card);
  }

  pick(v = 0) {
    if (v.constructor === Card) {
      return this.cards.splice(this.cards.indexOf(v), 1)[0];
    } else {
      return this.cards.splice(v, 1)[0];
    }
  }

  isEmpty() {
    return this.cards.length === 0;
  }
}

module.exports = Deck;
