const Employee = require('../models/employee');

const create = async (employeeData) => {
  return await Employee.create(employeeData);
};

const findById = async (employeeId) => {
  return await Employee.findById(employeeId);
};

const findAll = async () => {
  return await Employee.find();
};

const update = async (employeeId, employeeData) => {
  return await Employee.findByIdAndUpdate(employeeId, employeeData, { new: true });
};

const remove = async (employeeId) => {
  return await Employee.findByIdAndDelete(employeeId);
};

module.exports = {
  create,
  findById,
  findAll,
  update,
  remove,
};
