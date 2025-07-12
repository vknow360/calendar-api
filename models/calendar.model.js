const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    course: {type: String, required: true},
    sessions: {
        type: Map,
        of: String,
        default: {}
    }
});

module.exports = mongoose.model('Calendar', calendarSchema);