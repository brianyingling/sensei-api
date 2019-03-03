var service = require('../services/location');

function create(req, res) {
    const { name } = req.body;
    service.create(name)
        .then(location => res.send(location))
        .catch(error => res.send(error));
}

function index(req, res) {
    service.index()
        .then(locations => res.send(locations))
        .catch(error => res.send(error));
}

module.exports = {
    create: create,
    index: index,
}