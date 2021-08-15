const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const config = require('./config/config')
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    })
    .then(() => console.log('mongoDB is connected'))
    .catch(err => console.log(err))


/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              Root Path
 */////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('hi it\'s express');
})

/*////////////////////////////////////////////////////////////////////////////////////////////////
 *                              회원 등록
 */////////////////////////////////////////////////////////////////////////////////////////////////
const { User } = require('./models/User');
app.post('/register', (req, res) => {

    const user = new User(req.body);

    user.save((err, userModel) => {
        if (err)
            return res.json({ success: false, err })
        else
            return res.status(200).json({ success: true })
    })
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})