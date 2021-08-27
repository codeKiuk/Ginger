const express = require('express');
const router = express.Router();
const { Content } = require('../../models/Content')
const { Comment } = require('../../models/Comment');

router.post('/api/comments', function (req, res) {
    const contentID = req.body.contentID;
    Content.findOne({ _id: contentID }, (err, content) => {
        // console.log('err? found content?: ', err ? err : content);
        if (err) return res.json({ success: false, err })

        const comment = new Comment({
            userID: req.body.userID,
            comment: req.body.comment,
            contentID: content._id,
            contentType: content.contentType,
        })

        comment.save((err, createdComment) => {
            // console.log('err? createdComment?: ', err ? err : createdComment);
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ success: true })
        })
    })
})

router.get('/api/comments', function (req, res) {
    const contentID = req.query.contentID;
    Comment.find({ contentID: contentID }, (err, comments) => {
        if (err) return res.json({ success: false, err })
        return res.json({ comments: comments })
    })
})

router.put('/api/comments', function (req, res) {

    const commentID = req.query.commentID;
    Comment.findByIdAndUpdate(commentID, req.body, (err, comment) => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true })
    })
})

router.delete('/api/comments', function (req, res) {

    const commentID = req.query.commentID;
    Comment.findByIdAndDelete(commentID, (err, comment) => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true })
    })
})


///////////////////////////////////////////////////////////////
// router.post('/api/group/comments', function (req, res) {

//     const contentID = req.query.contentID;
//     GroupContent.findOne({ _id: contentID }, (err, groupContent) => {

//         if (err) return res.json({ success: false, err })

//         const groupComment = new GroupComment({
//             userID: req.body.userID,
//             comment: req.body.comment,
//             contentID: groupContent._id,
//         })

//         groupComment.save((err, createdGroupComment) => {
//             if (err) return res.json({ success: false, err })
//             return res.status(200).json({ success: true })
//         })
//     })
// })

// router.get('/api/group/comments', function (req, res) {

//     const contentID = req.query.contentID;
//     GroupComment.find({ contentID: contentID }, (err, groupComment) => {
//         if (err) return res.json({ success: false, err })
//         return res.json({ comments: groupComment })
//     })
// })

// router.put('/api/group/comments', function (req, res) {

//     const commentID = req.querys.commentID;
//     GroupComment.findByIdAndUpdate(commentID, req.body, (err, groupComment) => {
//         if (err) return res.json({ success: false, err })
//         return res.json({ success: true })
//     })
// })

// router.delete('/api/group/comments', function (req, res) {

//     const commentID = req.query.commentID;
//     GroupComment.findByIdAndDelete(commentID, (err, groupComment) => {
//         if (err) return res.json({ success: false, err })
//         return res.json({ success: true })
//     })
// })

module.exports = router;