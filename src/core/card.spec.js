const expect = require('chai').expect;

const Card = require('./card');

describe('Card', () => {
  let cardData, card;

  beforeEach(() => {
    cardData = [2, 'spades'];
    card = new Card(...cardData);
  });

  it('initializes a new card', () => {
    expect(card.value).to.equal(cardData[0]);
    expect(card.seed).to.equal(cardData[1]);
  });

  it('returns a string representation of card', () => {
    expect(card.toString()).to.equal(cardData.join(''));
  });
});
