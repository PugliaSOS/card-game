const handlers = [];

const on = (event, callback) => {
    handlers.push({event, callback});
}

const fire = (event, args) => {
    handlers.forEach((h) => {
        if (h.event === event) {
            h.callback.apply(null, args);
        }
    })
}

module.exports = { on, fire };
