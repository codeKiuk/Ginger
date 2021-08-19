const mongoose = require('mongoose');

const ClubCommentSchema = mongoose.Schema({
    userID: {
        type: {

        }
    },
    comment: {
        type: String,
        required: true,
    },
    contentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClubContent',
    }
})

const ClubComment = mongoose.model('ClubComment', ClubCommentSchema, 'CLUB_COMMENT');

module.exports = { ClubComment };