const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');
router.post('/api/auth/register', function (req, res) {

    const user = new User(req.body);

    User.find({ userID: user.userID }, (err, serchedUser) => {
        if (err) {
            console.log('isDuplicated === false, err: ', err);
        } else {
            return res.json({ success: false, isDuplicated: true })
        }

    })

    user.save((err, createdUser) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({
            success: true,
            userID: createdUser.userID,
            password: createdUser.password
        })
    })
})

module.exports = router;