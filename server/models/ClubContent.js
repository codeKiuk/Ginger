const mongoose = require('mongoose');

const ClubContentSchema = mongoose.Schema({
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

const ClubContent = mongoose.model('ClubContent', ClubContentSchema, 'CLUB_CONTENT');

module.exports = { ClubContent };