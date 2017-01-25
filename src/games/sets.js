const Card = require('../core/card');
const naples = [];

'DCSB'.split('').forEach(s => {
  [...new Array(10)].forEach((k, n) => {
    naples.push(new Card((n + 1), s));
  });
});

module.exports = {
  naples
};
