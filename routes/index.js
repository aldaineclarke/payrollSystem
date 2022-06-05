const router = require('express').Router();
const indexController = require('../controllers/index.controller');
const { authGuard } = require('../middleware/auth.guard');
router.get("/:id",indexController.getUserInfo);

router.post("/authenticate",indexController.loginUser);





module.exports = router;
