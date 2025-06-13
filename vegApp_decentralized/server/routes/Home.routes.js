const router = require('express').Router()
const auth = require('../controllers/user');
const productController = require('../controllers/product');

router.post('/login', auth.userLogin);
router.post('/register', auth.createUser);
router.get('/products', productController.getProducts);

module.exports = router