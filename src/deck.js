const Card = require('./card');

class Deck {
    constructor(count) {
        this.cards = [...new Array(count)].map(_ => new Card());
    }
}

module.exports = Deck;
