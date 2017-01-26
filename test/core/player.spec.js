const expect = require('./../helper').expect;

const Player = require('./../../src/core/player');

describe('Player', () => {
  beforeEach(() => {
    this.player = new Player('Dom');
  });

  describe('#constructor', () => {
    it('initializes a new player', () => {
      expect(this.player.name).to.equal('Dom');
      expect(this.player.points).to.equal(0);
    });
  });
});
