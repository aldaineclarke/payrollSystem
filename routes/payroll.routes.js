const router = require('express').Router();
const payrollController = require('../controllers/payroll.controller');

router.get("/", payrollController.getAllPayroll);
router.get("/generate", payrollController.generateAllPayrolls);



module.exports = router;