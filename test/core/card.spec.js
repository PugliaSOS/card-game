const expect = require('./../helper').expect;

const Card = require('./../../src/core/card');

describe('Card', () => {
  beforeEach(() => {
    this.card = new Card(2, 'spades');
  });

  describe('#constructor', () => {
    it('initializes a new card', () => {
      expect(this.card.value).to.equal(2);
      expect(this.card.seed).to.equal('spades');
    });
  });

  describe('#toString', () => {
    it('returns a string representation of card', () => {
      expect(this.card.toString()).to.equal('2spades');
    });
  });
});
