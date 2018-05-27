require('dotenv').config({path: __dirname + '/.env'});
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var health = require('./app/controllers/health');
var home = require('./app/controllers/home');
var temperatures = require('./app/controllers/temperatures');
var app = express();

var DB_URI = process.env.DB_URI;
var NODE_ENV = process.env.NODE_ENV;
var PORT = process.env.PORT || 3000;

function connectToDb() {
    mongoose.connect(DB_URI)
        .then(() => console.log('DB Connection Successful'))
        .catch((e) => {
            console.error('DB CONNECTION ERROR:', e);
            setTimeout(connectToDb, 5000);
        });
}

connectToDb();
// try {
//     mongoose.connect(DB_URI);
//     var db = mongoose.connection;
//     db.on('error', err => console.error("DB ERR:", err));
// } catch (e) {
//     console.error('MONGOOSE ERROR:', e);
// }

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

app.listen(PORT, function() {
    console.log('Sensei API');
    console.log('Listening on ' + PORT);
    console.log('MONGO DB:', DB_URI);
});

module.exports = app;
