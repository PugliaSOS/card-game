const Card = require('../core/card');

const naples = [];

'DCSB'.split('').forEach((family) => {
  [...new Array(10)].forEach((k, n) => {
    naples.push(new Card((n + 1), family));
  });
});

module.exports = { naples };
