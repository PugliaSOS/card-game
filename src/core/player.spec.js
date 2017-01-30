const expect = require('chai').expect;

const Player = require('./player');

describe('Player', () => {
  let player;

  it('initializes a new player', () => {
    player = new Player('Dom');

    expect(player.name).to.equal('Dom');
    expect(player.points).to.equal(0);
  });
});
