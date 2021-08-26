const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config');

const authRoute = require('./routes/auth/auth');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const registerRoute = require('./routes/auth/register');
const contentRoute = require('./routes/home/contents');
const commentRoute = require('./routes/home/comments');
const myContentRoute = require('./routes/myPage/myContents');
const myCommentRoute = require('./routes/myPage/myComments');

const corsOption = {
    // origin: [/\.example2\.com$/],
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOption));

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                                          Routers
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.use(authRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(registerRoute);
app.use(contentRoute);
app.use(commentRoute);
app.use(myContentRoute);
app.use(myCommentRoute);

// SSR
app.get('/', function (req, res) {

})

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
    })
    .then(() => console.log('mongoDB is connected'))
    .catch(err => console.log(err));


const port = 8000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})