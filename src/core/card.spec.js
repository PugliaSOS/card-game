const expect = require('chai').expect;

const Card = require('./card');

describe('Card', () => {
  it('initializes a new card', () => {
    const card = new Card(2, 'spades');

    expect(card.value).to.equal(2);
    expect(card.seed).to.equal('spades');
  });

  it('returns a string representation of card', () => {
    const card = new Card(3, 'spades');
    expect(card.toString()).to.equal('3spades');
  });

  it('takes only the first two arguments', () => {
    const card = new Card(3, 'coins', 'spades', 'clubs');
    expect(card.toString()).to.equal('3coins');
  });
});
