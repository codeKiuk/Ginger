const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    })
    .then(() => console.log('mongoDB is connected'))
    .catch(err => console.log(err));


/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              Root Path
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/', (req, res) => {

})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              회원 등록
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/register', (req, res) => {

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              로그인
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/login', (req, res) => {

    User.findOne({ userID: req.body.userID }, (err, user) => {
        // UserID Match?
        if (!user)
            return res.json({
                loginSuccess: false,
                emailMatch: false,
                message: "이메일이 존재하지 않습니다."
            })

        user.comparePassword(req.body.password, (err, isMatch) => {
            // 비밀번호 Match?
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    passwordMatch: false,
                    message: '비밀번호가 틀렸습니다'
                })
            // 비밀번호 Match => Token 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                // Cookie에 토큰 저장
                res.cookie('token', user.token)
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
 *                              동아리/학회 글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/clubContent', (req, res) => {

})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              스터디/소모임 글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////



/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              동아리/학회 댓글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              스터디/소모임 댓글 작성
 */////////////////////////////////////////////////////////////////////////////////////////////////

const port = 8000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})