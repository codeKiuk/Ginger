const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

userSchema.methods.comparePassword = function (plainPassword, callback) {

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err);

        return callback(null, isMatch);
    })
}

userSchema.methods.generateToken = function (callback) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'userToken')

    user.token = token;
    user.save((err, user) => {
        if (err) return callback(err)
        return callback(null, user)
    })
}

userSchema.statics.findByToken = function (token, callback) {
    const user = this;

    // token 복호화
    jwt.verify(token, 'userToken', function (err, decoded) {
        // decoded == user._id
        user.findOne({ _id: decoded, token: token, }, function (err, user) {
            if (err) return callback(err);
            return callback(null, user);
        })

    })
}

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