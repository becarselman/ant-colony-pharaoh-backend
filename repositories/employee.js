const Employee = require('../db/models/employee');

class EmployeeRepository {
  async createEmployee(employeeData) {
    try {
      const employee = new Employee(employeeData);
      return await employee.save();
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(employeeId) {
    try {
      return await Employee.findById(employeeId);
    } catch (error) {
      throw error;
    }
  }

  async getAllEmployees() {
    try {
      return await Employee.find();
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(employeeId, employeeData) {
    try {
      return await Employee.findByIdAndUpdate(employeeId, employeeData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(employeeId) {
    try {
      return await Employee.findByIdAndDelete(employeeId);
    } catch (error) {
      throw error;
    }
  }

  async getPaginatedEmployees(page, limit, searchQuery) {
    try {
      const query = searchQuery ? { $text: { $search: searchQuery } } : {};
      const options = {
        page: page,
        limit: limit,
      };
      const employees = await Employee.paginate(query, options);
      return {
        employees: employees.docs,
        count: employees.totalDocs,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EmployeeRepository();
