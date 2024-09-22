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
    },
    frequency: {
        type: Number,   // Add frequency with Number (integer type)
        required: true,
        default: 0      // Optionally, you can set a default value
    }
}, {timestamps: true});

const WordModel = mongoose.model('sign language', wordSchema);

module.exports = WordModel;
