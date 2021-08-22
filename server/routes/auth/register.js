const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');

router.post('/api/auth/register', async function (req, res) {

<<<<<<< HEAD
=======

>>>>>>> 42eb2753a380319cb9a784b017f96eb5618e5dfe
    const user = new User(req.body);

    User.findOne({ userID: user.userID }, (err, serchedUser) => {
        if (err) return res.json({ success: false, err })
        else if (serchedUser !== null) return res.json({ success: false, isDuplicated: true })
        else
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

<<<<<<< HEAD
=======


>>>>>>> 42eb2753a380319cb9a784b017f96eb5618e5dfe
})

module.exports = router;
