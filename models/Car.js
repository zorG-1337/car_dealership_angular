const mongoose = require('mongoose');
const Schema = mongoose.Schema
const carSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    yearOfRelease: {
        type: Number,
        required: true
    },
    drive: {
        type: String,
        required: true
    },
    engine: {
        type: Number,
        required: true
    },
    rudder: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
})
module.exports = mongoose.model("car", carSchema)