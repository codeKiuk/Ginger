const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
    contentType: {
        type: Number, // 0: Club, 1: Group
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userID: {   // for DB reference
        type: String,
        required: true,
    }
})

const Content = mongoose.model('Content', ContentSchema, 'CONTENT');

module.exports = { Content };