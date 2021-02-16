const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
});

module.exports = mongoose.model('User', userSchema);