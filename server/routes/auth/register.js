const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');

router.post('/api/auth/register', async function (req, res) {

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

})

module.exports = router;
