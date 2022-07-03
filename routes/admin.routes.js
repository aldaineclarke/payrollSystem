const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const employeeRouter = require("../routes/employee.routes");
const departmentRouter = require("../routes/department.routes");
const timecardRouter = require("../routes/timecard.routes");
const payrollRouter = require("../routes/payroll.routes");
const { isAdmin } = require('../middleware/auth.guard');


router.use("/employees/", employeeRouter);
router.use("/departments/", isAdmin,departmentRouter);
router.use("/timecards/", isAdmin,timecardRouter);
router.use("/payrolls/",payrollRouter);

// router.get("/",adminController.getAllEmployees)
router.post("/create",isAdmin,adminController.createEmployee);

router.post("/authenticate");





module.exports = router;
