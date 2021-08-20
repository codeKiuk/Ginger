const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

const authRoute = require('./routes/auth/auth');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const registerRoute = require('./routes/auth/register');
const clubContentRoute = require('./routes/club/contents');
const clubCommentRoute = require('./routes/club/comments');
const groupContentRoute = require('./routes/group/contents');
const groupCommentRoute = require('./routes/group/comments');

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
app.use(clubContentRoute);
app.use(clubCommentRoute);
app.use(groupContentRoute);
app.use(groupCommentRoute);

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    })
    .then(() => console.log('mongoDB is connected'))
    .catch(err => console.log(err));


const port = 8000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})