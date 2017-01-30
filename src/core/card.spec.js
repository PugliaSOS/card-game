const expect = require('chai').expect;

const Card = require('./card');

describe('Card', () => {
  it('initializes a new card', () => {
    const cardData = [2, 'spades'];
    const card = new Card(...cardData);

    expect(card.value).to.equal(cardData[0]);
    expect(card.seed).to.equal(cardData[1]);
  });

  it('returns a string representation of card', () => {
    const cardData = [3, 'spades'];
    const card = new Card(...cardData);

    expect(card.toString()).to.equal('3spades');
  });
});
