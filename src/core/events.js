const handlers = [];

const on = (event, callback) => {
  handlers.push({ event, callback });
};

const fire = (event, ...args) => {
  handlers.forEach((handler) => {
    if (handler.event === event) {
      handler.callback.apply(args);
    }
  });
};

module.exports = { on, fire };
