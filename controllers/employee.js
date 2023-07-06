const employeeService = require('../services/employee');
const errors = require("../configuration/errors");

exports.createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    return res.status(500).json({ error: errors.FAILED_TO_CREATE_EMPLOYEE });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ error: errors.FAILED_TO_GET_EMPLOYEE });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ error: errors.FAILED_TO_GET_EMPLOYEES });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ error: errors.FAILED_TO_UPDATE_EMPLOYEE });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: errors.FAILED_TO_DELETE_EMPLOYEE });
  }
};

exports.getPaginatedEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || null;

    const result = await employeeService.getPaginatedEmployees(page, limit, searchQuery);

    const { employees, count } = result;
    return res.status(200).json({ employees, count });
  } catch (error) {
    return res.status(500).json({ error: errors.FAILED_TO_GET_EMPLOYEES });
  }
};
