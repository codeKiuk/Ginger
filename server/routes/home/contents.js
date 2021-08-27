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

router.get('/api/club/contents', function (req, res) {

    const skip = (req.query.page - 1) * req.query.perPage;
    const limit = Number(req.query.perPage);
    let count;

    Content.estimatedDocumentCount({ contentType: 0 }, function (err, result) {
        count = result;
    })

    Content
        .find({ contentType: 0 })
        .skip(skip)
        .limit(limit)
        .exec((err, contents) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ contents: contents, contentsCount: count })
        })
})

router.get('/api/group/contents', function (req, res) {
    const skip = (req.query.page - 1) * req.query.perPage;
    const limit = Number(req.query.perPage);
    let count;

    Content.estimatedDocumentCount({ contentType: 1 }, function (err, result) {
        count = result;
    })

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

    const contentID = req.query.contentID;
    Content.findByIdAndUpdate(contentID, req.body, (err, content) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    });
})

router.delete('/api/contents', function (req, res) {

    const contentID = req.query.contentID;
    Content.findByIdAndDelete(contentID, (err, content) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

/////////////////////////////////////////////////////////////////////////////////////
// router.post('/api/group/contents', function (req, res) {
//     const groupContent = new GroupContent(req.body);

//     groupContent.save((err, createdGroupContent) => {
//         if (err) return res.json({ success: false, err })

//         return res.status(200).json({ success: true })
//     })
// })

// router.get('/api/group/contents', function (req, res) {

//     const skip = (req.query.page - 1) * req.query.perPage;
//     const limit = Number(req.query.perPage);
//     let count;

//     GroupContent.estimatedDocumentCount({}, function (err, result) {
//         count = result;
//     })

//     GroupContent
//         .find()
//         .skip(skip)
//         .limit(limit)
//         .exec((err, groupContent) => {
//             // console.log('groupContent: ', groupContent)
//             if (err) return res.json({ success: false, err })
//             return res.status(200).json({ contents: groupContent, contentsCount: count })
//         })

//     // [{
//     //     _id: 611f2db6d2be8d123521661b,
//     //     userID: 'dddd@nav.com',
//     //     title: '6',
//     //     content: 'test group content',
//     //     __v: 0
//     //   }, ...]
// })

// router.put('/api/group/contents', function (req, res) {

//     const contentID = req.query.contentID;
//     GroupContent.findByIdAndUpdate(contentID, req.body, (err, groupContent) => {
//         if (err) return res.json({ success: false, err })
//         return res.status(200).json({ success: true })
//     });
// })

// router.delete('/api/group/contents', function (req, res) {

//     const contentID = req.query.contentID;
//     GroupContent.findByIdAndDelete(contentID, (err, groupContent) => {
//         if (err) return res.json({ success: false, err })
//         return res.status(200).json({ success: true })
//     })
// })

module.exports = router;