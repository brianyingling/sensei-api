var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    name:       {type: String, unique: true, required: true},
    createdAt:  {type: Date, required: true, default: Date.now},
    updatedAt:  {type: Date}
});

LocationSchema.pre('save', next => {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    this.updatedAt = now;
    next();
});

module.exports = mongoose.model('location', LocationSchema);
