var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemperatureSchema = new Schema({
    value:      {type: Number, required: true},
    scale:      {type: String, required: true},
    device:     {type: String, required: true},
    createdAt:  {type: Date, default: Date.now}
});

TemperatureSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('temperature', TemperatureSchema);
