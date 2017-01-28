const expect = require('./../helper').expect;

const Player = require('./../../src/core/player');

describe('Player', () => {
  const player = new Player('Dom');

  it('initializes a new player', () => {
    expect(player.name).to.equal('Dom');
    expect(player.points).to.equal(0);
  });
});
