const express = require('express');
const router = express.Router();
const GroupContent = require('../../models/GroupContent')

router.post('/api/group/contents', function (req, res) {
    const groupContent = new GroupContent(req.body);

    groupContent.save((err, createdGroupContent) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

router.get('/api/group/contents/:contentID', function (req, res) {

})

module.exports = router;