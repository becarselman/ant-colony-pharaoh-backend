const Employee = require('../db/models/employee');

module.exports = {
  async createEmployee(employeeData) {
    return await Employee.create(employeeData);
  },

  async getEmployeeById(employeeId) {
    return await Employee.findById(employeeId);
  },

  async getAllEmployees() {
    return await Employee.find();
  },

  async updateEmployee(employeeId, employeeData) {
    return await Employee.findByIdAndUpdate(employeeId, employeeData, { new: true });
  },

  async deleteEmployee(employeeId) {
    return await Employee.findByIdAndDelete(employeeId);
  }
};
