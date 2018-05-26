process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Temperature = require('../models/temperature');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

let temp = {
    "id":"sensei_001",
    "timestamp":"2018-05-20T03:38:58Z",
    "temperature":{
        "value":73.4,
        "scale":"fahrenheit"
    },
    "humidity":{
        "value":33,
        "scale":"percentage"
    }
};

chai.use(chaiHttp);

describe('Temperatures', () => {
    beforeEach(((done) => {
        Temperature.remove({}, (err) => {
            if (err) console.err('error:', err);
            done();
        });
    }));

    describe('GET /temperatures', () => {
        it('exists', (done) => {
            chai.request(server)
                .get('/temperatures')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        
        it('responds with an array as its body', (done) => {
            chai.request(server)
                .get('/temperatures')
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('gets all the temperatures', (done) => {
            chai.request(server)
                .get('/temperatures')
                .end((err, res) => {
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('POST /temperatures', () => {
        it('exists', (done) => {
            chai.request(server)
                .post('/temperatures')
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('saves a temperature reading', (done) => {
            chai.request(server)
                .post('/temperatures')
                .send(temp)
                .end((err, res) => {
                    console.log("BODY:", res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('value');
                    res.body.should.have.property('scale');
                    res.body.should.have.property('device');
                    res.body.should.have.property('createdAt');
                    done();
                });
        });
    });
});


// temperature mongodb entry
/*
_id: "5b00eddb4d83f175a7494793",
value: 73.4,
scale: "fahrenheit",
device: "sensei_001",
createdAt: "2018-05-20T03:39:07.142Z",
__v: 0
}

*/

// data from sensei proxy
/*
{"id":"sensei_001","timestamp":"2018-05-20T03:38:58Z","temperature":{"value":73.4,"scale":"fahrenheit"},"humidity":{"value":33,"scale":"percentage"}}

*/