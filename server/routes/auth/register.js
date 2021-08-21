const express = require('express');
const router = express.Router();
const { User } = require('../../models/User');

router.post('/api/auth/register', function (req, res) {

    const user = new User(req.body);

    User.findOne({ userID: user.userID }, (err, serchedUser) => {
        if (err) return res.json({ success: false, err })
        else if (serchedUser !== null) return res.json({ success: false, isDuplicated: true })

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