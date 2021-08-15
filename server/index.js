import express from 'express';
import { Mongoose } from 'mongoose';

const mongoose = new Mongoose();
const app = express();
const port = 8000;


mongoose
    .connect('mongodb+srv://kiuk:<1234>@ginger.23wuj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    })
    .then(() => console.log('mongoDB is connected'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('hi it\'s express');
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})