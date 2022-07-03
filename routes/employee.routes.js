const router = require("express").Router();
const EmployeeController = require("../controllers/employee.controller.js");
const { isAdmin, isAuthorizedAndAdmin } = require("../middleware/auth.guard.js");

router.get("/", isAdmin,EmployeeController.getAllEmployees);
router.get("/details/:id", isAuthorizedAndAdmin,EmployeeController.getEmployee);
router.post("/details/:id",isAuthorizedAndAdmin,EmployeeController.updateEmployee);
router.get("/delete/:id",isAdmin, EmployeeController.deleteEmployee);
router.get("/add", isAdmin, EmployeeController.getEmployeeCreationForm);
router.post("/add",isAdmin, EmployeeController.createEmployee);
module.exports = router