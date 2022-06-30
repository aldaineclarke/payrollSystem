const router = require('express').Router()
const departmentController = require("../controllers/department.controller");


router.get("/", departmentController.getAllDepartments);

router.get("/add", departmentController.createDepartmentForm);
router.post("/add", departmentController.createDepartment);
router.get("/:id", departmentController.getDepartment);
router.post("/:id", departmentController.updateDepartment);





module.exports = router;