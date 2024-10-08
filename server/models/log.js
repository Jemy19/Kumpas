const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  level: { type: String, enum: ['info', 'error', 'warn', 'debug'], default: 'info' },
  message: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the admin who triggered the log
  adminName: { type: String }, // Store the admin's username
  timestamp: { type: Date, default: Date.now } // Timestamp of the log
});

const Log = mongoose.model('Logs', logSchema);

module.exports = Log;
