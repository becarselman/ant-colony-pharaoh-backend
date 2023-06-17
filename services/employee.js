const employeeRepository = require('../repositories/employee');

class EmployeeService {
  async createEmployee(employeeData) {
    try {
      return await employeeRepository.createEmployee(employeeData);
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(employeeId) {
    try {
      return await employeeRepository.getEmployeeById(employeeId);
    } catch (error) {
      throw error;
    }
  }

  async getAllEmployees() {
    try {
      return await employeeRepository.getAllEmployees();
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(employeeId, employeeData) {
    try {
      return await employeeRepository.updateEmployee(employeeId, employeeData);
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(employeeId) {
    try {
      return await employeeRepository.deleteEmployee(employeeId);
    } catch (error) {
      throw error;
    }
  }

  async getPaginatedEmployees(page, limit, searchQuery) {
    try {
      return await employeeRepository.getPaginatedEmployees(page, limit, searchQuery);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EmployeeService();
