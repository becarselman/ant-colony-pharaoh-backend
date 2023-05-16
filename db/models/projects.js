const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  },
  developers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullTime: { type: Boolean, required: true }
  }],
  projectType: { type: String, enum: ['fixed', 'on going'], required: true },
  hourlyRate: { type: Number, required: true },
  projectValue: { type: Number, required: true },
  actualEndDate: { type: Date, default: null }, 
  salesChannel: { type: String },
  isFinished: { type: Boolean, default: false }
});

module.exports = mongoose.model('Project', projectSchema);
