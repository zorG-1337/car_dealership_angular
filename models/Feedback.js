const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userFeedback = new Schema({
    carId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true 
    },
    rating: {
        type: Number,
        required: true
    },
})
module.exports = mongoose.model("userFeedback", userFeedback)