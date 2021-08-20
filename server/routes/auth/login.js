const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { User } = require('../../models/User');

router.use(cookieParser());

router.post('/api/auth/login', function (req, res) {

    User.findOne({ userID: req.body.userID }, function (err, user) {
        // UserID Match?
        if (!user)
            return res.json({
                success: false,
                userIDMatch: false,
                message: "이메일이 존재하지 않습니다."
            })

        user.comparePassword(req.body.password, function (err, isMatch) {
            // 비밀번호 Match?
            if (!isMatch)
                return res.json({
                    success: false,
                    passwordMatch: false,
                    message: '비밀번호가 틀렸습니다'
                })
            // 비밀번호 Match => Token 생성
            user.generateToken(function (err, user) {
                if (err) return res.status(400).send(err)

                // Cookie에 토큰 저장
                res.cookie('auth', user.token)
                    .status(200)
                    .json({
                        success: true,
                        userID: user.userID,
                        id: user._id,
                    })
            })
        })
    })
})

module.exports = router;