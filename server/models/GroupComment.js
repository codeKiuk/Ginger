const mongoose = require('mongoose');

const GroupCommentSchema = mongoose.Schema({
    /**
     * _id : {}
     */
    userID: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    contentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GropContent',
    }
})

const GroupComment = mongoose.model('GroupComment', GroupCommentSchema, 'GROUP_COMMENT');

module.exports = { GroupComment };