const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');
const { validateEmployeeData } = require('../middleware/employee');

router.post('/', validateEmployeeData, employeeController.createEmployee);
router.get('/', employeeController.getAllEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', validateEmployeeData, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
