const mongoose = require('mongoose');

// users Schema
const usersSchema = new mongoose.Schema({
    account: String,
    password: String
});

// Exporting our model objects
module.exports = mongoose.model('User', usersSchema);