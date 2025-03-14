const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckInSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: Number, required: true },
  energy: { type: Number, required: true },
  stress: { type: Number, required: true },
  selectedEmotions: { type: [String], default: [] },
  reflection: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CheckIn', CheckInSchema);
