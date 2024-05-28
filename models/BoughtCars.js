const mongoose = require('mongoose');
const Schema = mongoose.Schema
const boughtCars = new Schema({
    userId: {
        required: true,
        type: String
    },

    date: {
        required: true,
        type: Date
    },
    brand: {
        required: true,
        type: String
    },
    model: {
        required: true,
        type: String
    },
    yearOfRelease: {
        required: true,
        type: Number
    },
    color: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    image: {
        required: true,
        type: String
    },
    usersFeedback: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model("boughtCars", boughtCars)