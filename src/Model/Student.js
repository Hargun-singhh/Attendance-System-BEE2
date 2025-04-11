const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    SName: {
        type: String,
        required: true
    },
    RollNumber: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Student', studentSchema);
