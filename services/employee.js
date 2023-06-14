const Employee = require('../db/models/employee');
const errors = require('../configuration/errors');

module.exports = {
  async createEmployee(employeeData) {
    return await Employee.create(employeeData);
  },

  async getEmployeeById(employeeId) {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error(errors.EMPLOYEE_NOT_FOUND);
    }
    return employee;
  },

  async updateEmployee(employeeId, employeeData) {
    return await Employee.findByIdAndUpdate(employeeId, employeeData, { new: true });
  },

  async deleteEmployee(employeeId) {
    return await Employee.findByIdAndDelete(employeeId);
  },

  async getAllEmployees() {
    return await Employee.find();
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
