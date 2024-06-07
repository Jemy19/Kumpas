const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    }
}, {timestamps: true});

const WordModel = mongoose.model('sign language', wordSchema);

module.exports = WordModel;
