const express = require('express')
const router = express.Router();
const { ClubContent } = require('../../models/ClubContent');

router.post('/api/club/contents', function (req, res) {

    const clubContent = new ClubContent(req.body);

    clubContent.save((err, createdClubContent) => {
        console.log('clubContent :', createdClubContent)
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
        })
    })
})

router.get('/api/club/contents', function (req, res) {
    const skip = (req.body.page - 1) * req.body.perPage;
    const limit = req.body.perPage;

    ClubContent
        .find()
        .skip(skip)
        .limit(limit)
        .exec((err, clubContent) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ contents: clubContent })
        })
})

module.exports = router;