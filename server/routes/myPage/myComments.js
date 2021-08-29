const express = require('express')
const router = express.Router();
const { Content } = require('../../models/Content')
const { Comment } = require('../../models/Comment')

router.get('/api/my-comments', async function (req, res) {
    const userID = req.query.userID;
    const skip = (req.query.page - 1) * req.query.perPage;
    const limit = Number(req.query.perPage);

    const count = await Comment.countDocuments({ userID: userID })

    Comment
        .find({ userID: userID })
        .skip(skip)
        .limit(limit)
        .exec((err, comments) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ comments: comments, commentsCount: count })
        })


})

module.exports = router;