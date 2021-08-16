const { User } = require('../models/User');
// 인증 처리 
const auth = function (req, res, next) {

    const token = req.cookies.auth;
    User.findByToken(token, (err, user) => {
        if (err) return next(err)
        else if (!user) return res.json({
            tokenMatch: false,
            message: '쿠키의 token과 일치하는 토큰이 존재하지 않습니다.'
        })

        req.token = token;
        req.user = user
        return next()
    })
}

module.exports = { auth };