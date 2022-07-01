const router = require('express').Router()
const timecardController = require("../controllers/timecard.controller");


router.get("/", timecardController.getAllTimecards);

// router.get("/add", timecardController.createDepartmentForm);
// router.post("/add", timecardController.createDepartment);
// router.get("/:id", timecardController.getDepartment);
// router.post("/:id", timecardController.updateDepartment);
// router.get("/delete/:id", timecardController.deleteDepartment);


router.get("/update/:id", timecardController.renderTimeCardForm);
router.post("/update/:id", timecardController.updateTimecard);

router.get("/approveHours/:id", timecardController.approveHours);


module.exports = router;