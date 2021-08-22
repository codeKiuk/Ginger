const express = require('express');
const router = express.Router();
const { GroupContent } = require('../../models/GroupContent')

router.post('/api/group/contents', function (req, res) {
    const groupContent = new GroupContent(req.body);

    groupContent.save((err, createdGroupContent) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

router.get('/api/group/contents', function (req, res) {

    const skip = (req.query.page - 1) * req.query.perPage;
    const limit = req.query.perPage;

    GroupContent
        .find()
        .skip(skip)
        .limit(limit)
        .exec((err, groupContent) => {
            // console.log('groupContent: ', groupContent)
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ contents: groupContent })
        })

    // [{
    //     _id: 611f2db6d2be8d123521661b,
    //     userID: 'dddd@nav.com',
    //     title: '6',
    //     content: 'test group content',
    //     __v: 0
    //   }, ...]
})

router.put('/api/group/contents', function (req, res) {

    const contentID = req.query.contentID;
    GroupContent.findByIdAndUpdate(contentID, req.body, (err, groupContent) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    });
})

router.delete('/api/group/contents', function (req, res) {

    const contentID = req.query.contentID;
    GroupContent.findByIdAndDelete(contentID, (err, groupContent) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

module.exports = router;