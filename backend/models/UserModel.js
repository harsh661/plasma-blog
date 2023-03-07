const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: [true, 'That username is already taken']},
    password: {type: String, required: true,},
})

const UserModel = model('User', UserSchema)

module.exports = UserModel