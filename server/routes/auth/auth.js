const express = require('express')
const router = express.Router();
const { auth } = require('../../middleware/auth')

router.get('/api/auth', auth, function (req, res) {

    res.status(200).json({
        token: req.token,
        userID: req.user.userID,
        password: req.user.password,
        tokenMatch: true,
        admin: req.user.admin === 0 ? false : true,
    })
})

module.exports = router;