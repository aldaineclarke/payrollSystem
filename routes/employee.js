const router = require("express").Router();
const EmployeeController = require("../controllers/employee.controller.js")

router.get("employee/:id", EmployeeController.getEmployee)

module.exports = router