const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const employeeRouter = require("../routes/employee.routes");
const departmentRouter = require("../routes/department.routes");


router.use("/employees/", employeeRouter);
router.use("/departments/", departmentRouter);


router.get("/",adminController.getAllEmployees)
router.post("/create",adminController.createEmployee);

router.get("/updateTimecard/:id", adminController.renderTimeCardForm);
router.post("/updateTimecard/:id", adminController.updateTimecard);

router.get("/approveHours/:id", adminController.approveHours);

router.post("/authenticate");





module.exports = router;
