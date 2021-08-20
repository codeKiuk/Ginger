const express = require('express');
const router = express.Router();
const { ClubComment } = require('../../models/ClubComment');
const { ClubContent } = require('../../models/ClubContent');

router.post(`/api/club/comments/:contentID`, function (req, res) {
    // req.params.contentID
    const contentID = req.params.contentID;
    // console.log('contentID: ', contentID)
    ClubContent.findOne({ _id: contentID }, (err, clubContent) => {
        // console.log('clubContent: ', clubContent);
        if (!clubContent) return res.json({ success: false, err })

        const clubComment = new ClubComment({
            userID: req.body.userID,
            comment: req.body.comment,
            contentID: clubContent._id,
        });
        clubComment.save((err, createdClubComment) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({
                success: true,
            })
        })

    })

})

router.get('/api/club/comments/:contentID', function (req, res) {

    const contentID = req.params.contentID;
    ClubComment.find({ contentID: contentID }, (err, clubComment) => {
        if (err) return res.json({ success: false, err })
        return res.json({ comments: clubComment })
    })
})

module.exports = router;