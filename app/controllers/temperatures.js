var service = require('../services/temperature');

function create(req, res) {
    service.create(req, res);
}

function index(req, res) {
    service.index(req, res);
}

function latest(req, res) {
    service.latest(req, res);
}

module.exports = {
    create: create,
    index: index,
    latest: latest
}
