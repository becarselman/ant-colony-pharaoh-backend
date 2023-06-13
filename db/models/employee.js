const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false, 
  },
  department: {
    type: String,
    enum: ['Management', 'Administration', 'Design', 'Development'],
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  techStack: {
    type: String,
    enum: ['Full Stack', 'Front End', 'Back End', 'N/A'],
    required: true,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
