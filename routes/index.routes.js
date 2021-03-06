const router = require('express').Router();
const indexController = require('../controllers/index.controller');
const timecardController = require('../controllers/timecard.controller');
const { authGuard } = require('../middleware/auth.guard');

router.get("/login",(req,res,next)=>{
    res.locals.error_msg = req.flash("error");
    res.render("login",{title:"Login", messages:{error: res.locals.error_msg}})
});
router.get("/startClock",indexController.startEmployeeClock)
router.get("/stopClock",indexController.stopEmployeeClock)
router.get("/",indexController.getUserInfo);


router.post("/authenticate",indexController.loginUser);

router.get("/logout",indexController.logoutUser);
router.get("/profile",indexController.getEmployeeProfile);
router.post("/profile", indexController.updateEmployeeInfo);


module.exports = router;
