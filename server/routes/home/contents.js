const express = require('express');
const router = express.Router();
const { Content } = require('../../models/Content')

router.post('/api/club/contents', function (req, res) {
    const content = new Content({ ...req.body, contentType: 0 });

    content.save((err, createdContent) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

router.post('/api/group/contents', function (req, res) {
    const content = new Content({ ...req.body, contentType: 1 });

    content.save((err, createdContent) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

router.get('/api/club/contents', async function (req, res) {

    const skip = (req.query.page - 1) * req.query.perPage;
    const limit = Number(req.query.perPage);

    const count = await Content.countDocuments({ contentType: 0 })

    Content
        .find({ contentType: 0 })
        .skip(skip)
        .limit(limit)
        .exec((err, contents) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ contents: contents, contentsCount: count })
        })
})

router.get('/api/group/contents', async function (req, res) {
    const skip = (req.query.page - 1) * req.query.perPage;
    const limit = Number(req.query.perPage);

    const count = await Content.countDocuments({ contentType: 1 })

    Content
        .find({ contentType: 1 })
        .skip(skip)
        .limit(limit)
        .exec((err, contents) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ contents: contents, contentsCount: count })
        })


})

router.get('/api/single-content', function (req, res) {
    const contentID = req.query.contentID;

    Content.findOne({ _id: contentID }, (err, content) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ content: content })
    })
})

router.put('/api/contents', function (req, res) {

    const contentID = req.body.contentID;
    Content.findByIdAndUpdate(contentID, req.body, (err, content) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    });
})

router.delete('/api/contents', function (req, res) {

    const contentID = req.body.contentID;
    Content.findByIdAndDelete(contentID, (err, content) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

module.exports = router;