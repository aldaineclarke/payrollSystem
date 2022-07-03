const router = require('express').Router();
const payrollController = require('../controllers/payroll.controller');
const { isAdmin } = require('../middleware/auth.guard');

router.get("/",isAdmin,payrollController.getAllPayroll);
router.get("/generate", isAdmin,payrollController.generateAllPayrolls);



module.exports = router;