const handlers = [];

const on = (event, callback) => {
    handlers.push({event, callback});
}

const fire = function(event, args) {
    handlers.forEach((h) => {
        if (h.event === event) {
            h.callback.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    })
}

module.exports = { on, fire };
