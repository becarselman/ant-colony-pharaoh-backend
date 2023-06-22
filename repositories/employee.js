const Employee = require('../db/models/employee');

async function createEmployee(employeeData) {
  try {
    const employee = await Employee.create(employeeData);
    return employee;
  } catch (error) {
    throw error;
  }
}

async function getEmployeeById(employeeId) {
  try {
    return await Employee.findById(employeeId);
  } catch (error) {
    throw error;
  }
}

async function getAllEmployees() {
  try {
    return await Employee.find({}, 'id firstName lastName');
  } catch (error) {
    throw error;
  }
}

async function updateEmployee(employeeId, employeeData) {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, employeeData, { new: true });
    return updatedEmployee;
  } catch (error) {
    throw error;
  }
}

async function deleteEmployee(employeeId) {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    return deletedEmployee;
  } catch (error) {
    throw error;
  }
}

async function getPaginatedEmployees(page, limit, searchQuery) {
  try {
    const query = searchQuery
      ? {
          $or: [
            { firstName: { $regex: searchQuery, $options: "i" } }, 
            { lastName: { $regex: searchQuery, $options: "i" } }, 
          ],
        }
      : {};
    const skip = (page - 1) * limit;
    const employees = await Employee.find(query)
      .skip(skip)
      .limit(limit);
    const count = await Employee.countDocuments(query);
    return {
      employees,
      count,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getPaginatedEmployees,
};
