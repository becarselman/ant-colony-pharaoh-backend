const employeeService = require('../services/employee');
const errors = require('../configuration/errors');

exports.createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: errors.FAILED_TO_CREATE_EMPLOYEE });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: errors.EMPLOYEE_NOT_FOUND });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: errors.FAILED_TO_GET_EMPLOYEE });
  }
};

exports.getAllEmployee = async (req, res) => {
  try {
    const employee = await employeeService.getAllEmployee();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: errors.FAILED_TO_GET_EMPLOYEES });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    if (!employee) {
      return res.status(404).json({ error: errors.EMPLOYEE_NOT_FOUND });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: errors.FAILED_TO_UPDATE_EMPLOYEE });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: errors.EMPLOYEE_NOT_FOUND });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: errors.FAILED_TO_DELETE_EMPLOYEE });
  }
};