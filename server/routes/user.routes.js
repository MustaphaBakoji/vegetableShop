const router = require("express").Router()
const userController = require("../controllers/user.js");


router.post('/create', userController.createUser);
router.post('/auth', userController.userLogin);
router.get('/delete', userController.deleteUser);
router.get('/logout', userController.logout);
router.get('/test', userController.test);


module.exports = router
