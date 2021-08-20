const express = require('express');
const router = express.Router();
const { GroupContent } = require('../../models/GroupContent');
const { GroupComment } = require('../../models/GroupComment');

router.post('/api/group/comments/:contentID', function (req, res) {

    const contentID = req.params.contentID;
    GroupContent.findOne({ _id: contentID }, (err, groupContent) => {

        if (err) return res.json({ success: false, err })

        const groupComment = new GroupComment({
            userID: req.body.userID,
            comment: req.body.comment,
            contentID: groupContent._id,
        })

        groupComment.save((err, createdGroupComment) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ success: true })
        })
    })
})

router.get('/api/group/comments/:contentID', function (req, res) {

    const contentID = req.params.contentID;
    GroupComment.find({ contentID: contentID }, (err, groupComment) => {
        if (err) return res.json({ success: false, err })
        return res.json({ comments: groupComment })
    })
})

router.put('/api/group/comments/:commentID', function (req, res) {

    const commentID = req.params.commentID;
    GroupComment.findByIdAndUpdate(commentID, req.body, (err, groupComment) => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true })
    })
})

router.delete('/api/group/comments/:commentID', function (req, res) {

    const commentID = req.params.commentID;
    GroupComment.findByIdAndDelete(commentID, (err, groupComment) => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true })
    })
})

module.exports = router;