const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
const { User } = require('../../models/User');

router.get('/api/auth/register', function (req, res) {
    const userID = req.query.userID;

    User.findOne({ userID: userID }, (err, user) => {
        if (err) return res.json({ success: false, err });
        else if (user !== null) return res.json({ success: false, isDuplicated: true })
        return res.json({ success: true, isDuplicated: false })
    })
})

router.post('/api/auth/register', function (req, res) {

    const user = new User(req.body);

    user.save((err, createdUser) => {
        if (err) return res.json({ success: false, error: '회원가입 실패' })
        // console.log('createdUser: ', createdUser)
        return res.status(200).json({
            success: true,
            userID: req.body.userID,
            password: req.body.password
        })
    })
})

module.exports = router;
