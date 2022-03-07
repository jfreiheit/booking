const mongoose = require('mongoose');

// users Schema
const itemSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date: Date,
    user_id: String
});

// Exporting our model objects
module.exports = mongoose.model('Item', itemSchema);