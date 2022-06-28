const router = require("express").Router();
const EmployeeController = require("../controllers/employee.controller.js")

router.get("/", EmployeeController.getAllEmployees);
router.get("/details/:id", EmployeeController.getEmployee);
router.get("/edit/:id", EmployeeController.getEditEmployeeForm);
router.get("/add", EmployeeController.getEmployeeCreationForm);
router.post("/add", EmployeeController.createEmployee);
module.exports = router