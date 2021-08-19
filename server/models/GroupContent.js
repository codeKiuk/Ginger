const mongoose = require('mongoose');

const GroupContentSchema = mongoose.Schema({
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



const GroupContent = mongoose.model('GroupContent', GroupContentSchema, "GROUP_CONTENT");

module.exports = { GroupContent };