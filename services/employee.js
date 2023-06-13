const Employee = require('../db/models/employee');

module.exports = {
  async createEmployee(employeeData) {
    return await Employee.create(employeeData);
  },

  async getEmployeeById(employeeId) {
    return await Employee.findById(employeeId);
  },

  async updateEmployee(employeeId, employeeData) {
    return await Employee.findByIdAndUpdate(employeeId, employeeData, { new: true });
  },

  async deleteEmployee(employeeId) {
    return await Employee.findByIdAndDelete(employeeId);
  },

  async getPaginatedEmployees(page, limit, searchQuery) {
    const skip = (page - 1) * limit;
    const searchRegex = new RegExp(searchQuery, 'i');
  
    const employeesQuery = Employee.find({
      $or: [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
      ],
    });
  
    const employees = await employeesQuery.skip(skip).limit(limit).exec();
    const count = await Employee.countDocuments({
      $or: [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
      ],
    });
  
    return { employees, count };
  }
};
