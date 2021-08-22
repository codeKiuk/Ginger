const express = require('express');
const router = express.Router();
const { User } = require('../../models/User')
const { auth } = require('../../middleware/auth')

router.post('/api/auth/logout', auth, function (req, res) {

    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, function (err, user) {
        if (err) return res.json({ success: false, error: '로그아웃 실패' })
        return res.status(200).json({ success: true })
    })
})

module.exports = router;