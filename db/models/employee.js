const mongoose = require('mongoose');
const { departments, techStacks } = require('../../utils/enums');

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
    enum: [departments.MANAGEMENT, departments.ADMINISTRATION, departments.DESIGN, departments.DEVELOPMENT],
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  techStack: {
    type: String,
    enum: [techStacks.FULL_STACK, techStacks.FRONT_END, techStacks.BACK_END, techStacks.NA],
    required: true,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
