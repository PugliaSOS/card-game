const path = require('path');

const expect = require('chai').expect;

const Player = require('./../../src/core/player');

describe('Player', () => {
  it('initializes a new player', () => {
    const player = new Player('Dom');

    expect(player.name).to.equal('Dom');
    expect(player.points).to.equal(0);
  });
});
