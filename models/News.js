const mongoose = require('mongoose');
const Schema = mongoose.Schema
const newsSchema = new Schema({
    header: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },
    authorName: {
        required: true,
        type: String
    },
    authorSurname: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    }
})
module.exports = mongoose.model("news", newsSchema)