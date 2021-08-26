const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
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

const Comment = mongoose.model('Comment', CommentSchema, 'COMMENT');

module.exports = { Comment };