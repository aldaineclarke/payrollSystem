const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const employeeRouter = require("../routes/employee.routes");
const departmentRouter = require("../routes/department.routes");
const timecardRouter = require("../routes/timecard.routes");


router.use("/employees/", employeeRouter);
router.use("/departments/", departmentRouter);
router.use("/timecards", timecardRouter);

router.get("/",adminController.getAllEmployees)
router.post("/create",adminController.createEmployee);

router.post("/authenticate");





module.exports = router;
