const expect = require('./../helper').expect;

const Card = require('./../../src/core/card');

describe('Card', () => {
  const cardData = [2, 'spades'];
  const card = new Card(...cardData);

  it('initializes a new card', () => {
    expect(card.value).to.equal(cardData[0]);
    expect(card.seed).to.equal(cardData[1]);
  });

  it('returns a string representation of card', () => {
    expect(card.toString()).to.equal(cardData.join(''));
  });
});
