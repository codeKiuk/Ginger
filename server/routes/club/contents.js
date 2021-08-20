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

})

module.exports = router;