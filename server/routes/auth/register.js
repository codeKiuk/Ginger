const express = require('express');
const router = express.Router();

router.post('/api/auth/register', function (req, res) {

    const user = new User(req.body);

    user.save((err, createdUser) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

module.exports = router;