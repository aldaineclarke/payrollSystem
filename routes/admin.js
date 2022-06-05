const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.post("/create",adminController.createEmployee);

router.get("/:id/team", adminController.getAllEmployees);

router.post("/authenticate");





module.exports = router;
