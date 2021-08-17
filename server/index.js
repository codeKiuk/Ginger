const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth')

const corsOption = {
    // origin: [/\.example2\.com$/],
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOption));

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    })
    .then(() => console.log('mongoDB is connected'))
    .catch(err => console.log(err));


/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          Root Path
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/', (req, res) => {

})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          회원 등록
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/auth/register', function (req, res) {

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                              로그인
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/auth/login', function (req, res) {

    User.findOne({ userID: req.body.userID }, function (err, user) {
        // UserID Match?
        if (!user)
            return res.json({
                loginSuccess: false,
                userIDMatch: false,
                message: "이메일이 존재하지 않습니다."
            })

        user.comparePassword(req.body.password, function (err, isMatch) {
            // 비밀번호 Match?
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
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
                        loginSuccess: true,
                        userID: user.userID,
                        id: user._id,
                    })
            })
        })
    })
})
/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          로그아웃
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/auth/logout', auth, function (req, res) {

    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, function (err, user) {
        if (err) return res.json({ logoutSuccess: false, error: '로그아웃 실패' })
        return res.status(200).json({ logoutSuccess: true })
    })
})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              페이지 이동시 Token으로 Permission 체크
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/auth', auth, function (req, res) {

    res.status(200).json({
        token: req.token,
        userID: req.user.userID,
        password: req.user.password,
        tokenMatch: true,
        admin: req.user.admin === 0 ? false : true,
    })
})


/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          동아리/학회 글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/clubContent', function (req, res) {

})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          스터디/소모임 글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////



/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          동아리/학회 댓글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          스터디/소모임 댓글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////

const port = 8000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})