class Card {
  constructor(value, seed) {
    this.seed = seed;
    this.value = value;
  }

  toString() {
    return this.value + this.seed;
  }
}

module.exports = Card;
