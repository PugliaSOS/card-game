const Game = require('../../core/game');

class Scopa extends Game {
  getCombinations(arr) {
    if (arr.length < 2) { return [arr]; }

    const sub = this.getCombinations(arr.slice(1));
    return [
      [arr[0]],
      ...sub.map(c => [arr[0], ...c]),
      ...sub,
    ];
  }

  evaluatePossibilities(choice) {
    let possibilities = this.table.cards
      .filter(c => c.value === choice.value)
      .map(c => [c]);
    if (!possibilities.length) {
      possibilities = this.getCombinations(this.table.cards)
        .filter(c => c.reduce((a, b) => a.value + b.value, 0) === choice.value);
    }

    return possibilities;
  }

  startHand() {
    if (this.currentPlayer.hand.isEmpty()) {
      this.players.forEach((p) => {
        [...new Array(3)].forEach(() => p.hand.add(this.deck.draw()));
      });
    }

    super.startHand();
  }

  isOver() {
    return this.currentPlayer.hand.isEmpty() && this.deck.isEmpty();
  }

  startGame() {
    this.deck.mix();
    this.startHand();

    [...new Array(4)].forEach(() => this.table.add(this.deck.draw()));

    super.startGame();
    return this;
  }

  playCard(choice) {
    const card = this.currentPlayer.hand.pick(choice.card);
    const possibilities = this.evaluatePossibilities(card);

    if (possibilities.length) {
      possibilities[0].forEach(c => this.currentPlayer.score.add(this.table.pick(c)));
      this.currentPlayer.score.add(choice.card);

      if (this.table.isEmpty() && !this.deck.isEmpty()) {
        this.currentPlayer.scopa++;
      }
    } else {
      this.table.add(card);
    }

    return this;
  }

  static getScore(card, type) {
    switch (type) {
      case 'primiera':
        return [16, 12, 13, 14, 15, 18, 21, 10, 10, 10][card.value - 1];
      case 'denari':
        return card.seed === 'D' ? 1 : 0;
      case 'settebello':
        return (card.seed === 'D' && card.value === 7) ? 1 : 0;
    }

    return 1;
  }

  endMetch() {
    ['lunga', 'denari', 'settebello'].forEach((t) => {
      const scores = this.players.map(p => (
        p.score.cards.reduce((acc, c) => acc + this.getScore(c, t), 0)
      ));

      const maxScore = Math.max(...scores);
      if (scores.filter(v => v === maxScore).length === 1) {
        this.players[scores.indexOf(maxScore)].points++;
      }
    });

    // Primiera
    const primieraScores = this.players.map(player => 'DCSB'.split('').map((seed) => {
      const cardsPerSeed = player.score.cards.filter(card => card.seed === seed);
      const cardsScore = cardsPerSeed.map(card => this.getScore(card, 'primiera'));

      return Math.max.apply(null, cardsScore);
    }).reduce((a, b) => a + b, 0));

    const primieraMaxScore = Math.max(...primieraScores);
    if (primieraScores.filter(v => v === primieraMaxScore).length === 1) {
      this.players[primieraScores.indexOf(primieraMaxScore)].points++;
    }

    // Scopa
    this.players.forEach(player => player.points + player.scopa);

    return this;
  }
}

module.exports = Scopa;
