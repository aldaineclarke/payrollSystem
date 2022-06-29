const router = require("express").Router();
const EmployeeController = require("../controllers/employee.controller.js")

router.get("/", EmployeeController.getAllEmployees);
router.get("/details/:id", EmployeeController.getEmployee);
router.post("/details/:id", EmployeeController.updateEmployee);
router.get("/delete/:id", EmployeeController.deleteEmployee);
router.get("/add", EmployeeController.getEmployeeCreationForm);
router.post("/add", EmployeeController.createEmployee);
module.exports = router