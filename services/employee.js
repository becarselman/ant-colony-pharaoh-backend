const employeeRepository = require('../repositories/employee');
const errors = require("../configuration/errors");

module.exports = {
  async createEmployee(employeeData) {
    try {
      return await employeeRepository.createEmployee(employeeData);
    } catch (error) {
      throw new Error(errors.FAILED_TO_CREATE_EMPLOYEE);
    }
  },

  async getEmployeeById(employeeId) {
    try {
      const employee = await employeeRepository.getEmployeeById(employeeId);
      if (!employee) {
        throw new Error(errors.EMPLOYEE_NOT_FOUND);
      }
      return employee;
    } catch (error) {
      throw new Error(errors.FAILED_TO_GET_EMPLOYEE);
    }
  },

  async getAllEmployees() {
    try {
      return await employeeRepository.getAllEmployees();
    } catch (error) {
      throw new Error(errors.FAILED_TO_GET_EMPLOYEES);
    }
  },

  async updateEmployee(employeeId, employeeData) {
    try {
      const employee = await employeeRepository.updateEmployee(employeeId, employeeData);
      if (!employee) {
        throw new Error(errors.EMPLOYEE_NOT_FOUND);
      }
      return employee;
    } catch (error) {
      throw new Error(errors.FAILED_TO_UPDATE_EMPLOYEE);
    }
  },

  async deleteEmployee(employeeId) {
    try {
      const deletedEmployee = await employeeRepository.deleteEmployee(employeeId);
      if (!deletedEmployee) {
        throw new Error(errors.EMPLOYEE_NOT_FOUND);
      }
      return deletedEmployee;
    } catch (error) {
      throw new Error(errors.FAILED_TO_DELETE_EMPLOYEE);
    }
  },

  async getPaginatedEmployees(page, limit, searchQuery) {
    try {
      if (page < 1) {
        throw new Error(errors.PAGE_NUMBER_LESS_THAN_1);
      }

      if (limit <= 0) {
        throw new Error(errors.PAGE_SIZE_LESS_THAN_0);
      }

      return await employeeRepository.getPaginatedEmployees(page, limit, searchQuery);
    } catch (error) {
      throw new Error(errors.FAILED_TO_GET_EMPLOYEES);
    }
  },
};
