const mongoose = require('mongoose');
const { projectStatus } = require('../../utils/enums');


const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  },
  developers: [{
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    fullTime: { type: Boolean, required: true }
  }],
  projectType: { type: String, enum: ['fixed', 'on going'] },
  hourlyRate: { type: Number, required: true },
  projectValue: { type: Number, required: true },
  actualEndDate: { type: Date, default: null }, 
  salesChannel: { type: String },
  isFinished: { type: Boolean, default: false },
  projectStatus: { type: String, 
  enum: [projectStatus.ACTIVE, projectStatus.INACTIVE, projectStatus.ONHOLD, projectStatus.COMPLETED],
  default: projectStatus.Active }
});

module.exports = mongoose.model('Project', projectSchema);