const express = require('express')
const router = express.Router();
const { Content } = require('../../models/Content')

router.get('/api/my-contents', async function (req, res) {
    const userID = req.query.userID;
    const skip = (req.query.page - 1) * req.query.perPage;
    const limit = Number(req.query.perPage);

    const count = await Content.countDocuments({ userID: userID })

    Content
        .find({ userID: userID })
        .skip(skip)
        .limit(limit)
        .exec((err, contents) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ contents: contents, contentsCount: count })
        })


})

module.exports = router;