var Temperature = require('../models/temperature');

function create(req, res) {
    var body = req.body;
    var device = req.body.id;
    const temp = req.body.temperature;
    const data = {...temp, device };
    var temperature = new Temperature(data);
    temperature.save((err, temp) => {
        if (err) {
            console.error("error:", error);
        }
        res.send(temp);
    });
}

function index(req, res) {
    Temperature.find((err, temps) => {
        if (err) return console.error(error);
        res.send(temps);
    });
}

function latest(req, res) {
    Temperature.findOne({}, {}, {sort: {'createdAt': -1}}, function(err, temp) {
        if (err) return console.error(error);
        res.send(temp);
    });
}

module.exports = {
    create: create,
    index: index,
    latest: latest
}



