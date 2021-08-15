import { Mongoose } from 'mongoose';

const mongoose = new Mongoose();

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

export const User = mongoose.model('User', userSchema);