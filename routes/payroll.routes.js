const router = require('express').Router();
const payrollController = require('../controllers/payroll.controller');



router.get("/", payrollController.getAllPayroll);





module.exports = router;