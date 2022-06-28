const router = require("express").Router();
const EmployeeController = require("../controllers/employee.controller.js")

router.get("employees/:id", EmployeeController.getEmployee)
router.get("employees", EmployeeController.getEmployees)
module.exports = router