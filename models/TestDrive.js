const mongoose = require('mongoose');
const Schema = mongoose.Schema
const testDriveSchema = new Schema({
    userId: {
        required: true,
        type: String
    },
    carId: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    status: {
        type: String,
        default: 'Under consideration'
    }
})
module.exports = mongoose.model("testDrive", testDriveSchema)