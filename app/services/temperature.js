let Temperature = require('../models/temperature');

function create(req, res) {
    const body = req.body;
    const device = req.body.id;
    const temp = req.body.temperature;
    const data = {...temp, device };
    let temperature = new Temperature(data);
    temperature.save((err, temp) => {
        if (err) return res.send(err);
        res.send(temp);
    });
}

function index(req, res) {
    Temperature.find((err, temps) => {
        if (err) return res.send(err);
        res.send(temps);
    });
}

function latest(req, res) {
    Temperature.findOne({}, {}, {sort: {'createdAt': -1}}, function(err, temp) {
        if (err) return res.send(error);
        res.send(temp);
    });
}

module.exports = {
    create: create,
    index: index,
    latest: latest
}
