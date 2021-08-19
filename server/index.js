const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config');
const { User } = require('./models/User');
const { ClubContent } = require('./models/ClubContent');
const { GroupContent } = require('./models/GroupContent');
const { ClubComment } = require('./models/ClubComment');
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

    user.save((err, createdUser) => {
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
/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          로그아웃
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/auth/logout', auth, function (req, res) {

    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, function (err, user) {
        if (err) return res.json({ success: false, error: '로그아웃 실패' })
        return res.status(200).json({ success: true })
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
 *                                          ClubContent: 동아리/학회 글
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/club/contents', function (req, res) {

    const clubContent = new ClubContent(req.body);

    clubContent.save((err, createdClubContent) => {
        console.log('clubContent :', createdClubContent)
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
        })
    })
})

app.get('/api/club/contents', function (req, res) {

})
/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          ClubComment: 동아리/학회 댓글
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post(`/api/club/comments/:contentID`, function (req, res) {
    // req.params.contentID
    const contentID = req.params.contentID;
    // console.log('contentID: ', contentID)
    ClubContent.findOne({ _id: contentID }, (err, clubContent) => {
        // console.log('clubContent: ', clubContent);
        if (!clubContent) return res.json({ success: false, err })

        const clubComment = new ClubComment({
            userID: req.body.userID,
            comment: req.body.comment,
            contentID: clubContent._id,
        });
        clubComment.save((err, createdClubComment) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({
                success: true,
            })
        })

    })

})

app.get('/api/club/comments/:contentID', function (req, res) {

})


/*////////////////////////////////////////////////////////////////////////////////////////////////
*                                          GroupContent: 스터디/소모임 글
*/////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/group/contents', function (req, res) {
    const groupContent = new GroupContent(req.body);

    groupContent.save((err, createdGroupContent) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({ success: true })
    })
})

app.get('/api/group/contents/:contentID', function (req, res) {

})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          GroupComment: 스터디/소모임 댓글
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/group/comments/:contentID', function (req, res) {

    const contentID = req.params.contentID;
    GroupContent.findOne({ _id: contentID }, (err, groupContent) => {

        if (err) return res.json({ success: false, err })

        const groupComment = new GroupContent({
            userID: req.body.userID,
            comment: req.body.comment,
            contentID: groupContent._id,
        })

        groupComment.save((err, createdGroupComment) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ success: true })
        })
    })
})


const port = 8000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})