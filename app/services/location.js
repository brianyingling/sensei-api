const Location = require('../models/location');

function create(name) {
    let location = new Location({ name });
    return new Promise((resolve, reject) => {
        location.save((err, loc) => {
            if (err) return reject(err);
            return resolve(loc);
        });
    });
}

function index() {
    return new Promise((resolve, reject) => {
        Location.find((err, location) => {
            if (err) return reject(err);
            return resolve(location);
        })
    });
}

// TODO: make update
function update() {}

// TODO: make destroy
function destroy() {}

module.exports = {
    create: create,
    destroy: destroy,
    index: index,
    update: update
};
