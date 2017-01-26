const handlers = [];

const on = (event, callback) => {
  handlers.push({ event, callback });
};

const fire = (event, ...args) => {
  handlers.forEach((handler) => {
    if (handler.event === event) {
      handler.callback.apply(null, Array.prototype.slice.call(args, 1));
    }
  });
};

module.exports = { on, fire };
