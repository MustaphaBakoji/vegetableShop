const router = require('express').Router();
const productControllers = require('../controllers/product');
const { logout } = require('../controllers/user');
const jwtAuth = require('../Utils/jwt')
const multer = require('../Utils/multer');

// router.use(jwtAuth.authorization)
router.get('/logout', logout)
router.post('/uploadProduct', multer.single('image'), productControllers.createProduct);
router.post('/updateProduct', productControllers.updateProduct);



module.exports = router;