const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    PName: {
        type: String,
        required: true
    },
    ID: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    collection: 'professors'
});

module.exports = mongoose.model('Professor', professorSchema);
