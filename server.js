require('dotenv').config({path: __dirname + '/.env'});
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var health = require('./app/controllers/health');
var home = require('./app/controllers/home');
var temperatures = require('./app/controllers/temperatures');
var locations = require('./app/controllers/locations');
var app = express();

var SENSEI_DB_URI = process.env.SENSEI_DB_URI;
var NODE_ENV = process.env.NODE_ENV;
var PORT = process.env.PORT || 3000;

process.on('uncaughtException', function (err) {
    console.log('uncaught exception:', err);
}); 

function connectToDb() {
    mongoose.connect(SENSEI_DB_URI+'?authSource=sensei&w=1', {
        server: {
            reconnectTries: Number.MAX_SAFE_INTEGER,
            reconnectInterval: 1000,
            socketTimeoutMS: 60000
        }
    })
        .then(() => console.log('DB Connection Successful'))
        .catch((e) => {
            console.error('DB CONNECTION ERROR:', e);
            setTimeout(connectToDb, 5000);
        });
}

connectToDb();

if(NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.route('/')
    .get(home.index);

app.route('/health')
    .get(health.index);

app.route('/temperatures')
    .get(temperatures.index)
    .post(temperatures.create);

app.get('/temperatures/latest', temperatures.latest);

app.route('/locations')
    .get(locations.index)
    .post(locations.create);

app.listen(PORT, function() {
    console.log('Sensei API listening on port ' + PORT);
});

module.exports = app;
