const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: {
        type: String,
        unique: true
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['super_admin', 'admin'], required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

}, {timestamps: true})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel