const mongoose = require('mongoose');
const { Schema } = mongoose;

const mobuserSchema = new Schema({
    role: { type: String, enum: ['user'], required: true },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { type: String, required: true },
    username: { 
        type: String,
        unique: true 
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    isVerified: { 
        type: Boolean,
        default: true   
    }
}, { timestamps: true });

// Pre-save hook to concatenate email into username if not provided
mobuserSchema.pre('save', function(next) {
    if (!this.username) {
        this.username = this.email.split('@')[0]; // Default username from email
    }
    next();
});

const MobUser = mongoose.model('MobUser', mobuserSchema, 'mobileusers');

module.exports = MobUser;
