const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    userID: {
        type: String,
        trim: true,
        unique: 1,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        required: true,
    },
    admin: {
        type: Number,
        default: 0,
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function (next) {

    const user = this;
    console.log('user: ', user);

    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

});

const User = mongoose.model('User', userSchema, 'USER');

module.exports = { User };