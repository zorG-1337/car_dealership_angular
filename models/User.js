const mongoose = require('mongoose');
const Schema = mongoose.Schema
const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: "-"
    },
    image: {
        type: String,
        default: ""
    },
    cart: [mongoose.Schema.Types.Mixed]
})
module.exports = mongoose.model("customers", customerSchema)