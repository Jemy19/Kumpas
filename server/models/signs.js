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
    level: {
        type: String,
        enum: ['level 1', 'level 2', 'level 3', 'level 4'], // Restrict level choices
        required: true,
        default: 'level 1' // Default level
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
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const WordModel = mongoose.model('sign language', wordSchema);

module.exports = WordModel;
