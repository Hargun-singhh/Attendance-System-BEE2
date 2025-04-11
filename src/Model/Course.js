const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Course', courseSchema);
