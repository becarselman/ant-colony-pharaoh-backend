const mongoose = require('mongoose');

const ProjectStatus = {
  Active: 'Active',
  Inactive: 'Inactive',
  OnHold: 'On-hold',
  Completed: 'Completed'
};

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
  projectType: { type: String, enum: ['fixed', 'on going'], required: true },
  hourlyRate: { type: Number, required: true },
  projectValue: { type: Number, required: true },
  actualEndDate: { type: Date, default: null }, 
  salesChannel: { type: String },
  isFinished: { type: Boolean, default: false },
  projectStatus: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.Active }
});

module.exports = mongoose.model('Project', projectSchema);
