const router = require("express").Router();
const productControllers = require("../controllers/product");
const orderController = require("../controllers/order");
const adminControllers = require("../controllers/admin");
const jwtAuth = require("../Utils/jwt");
const upload = require("../Utils/multer");

//protected routes
router.use(jwtAuth.adminVerifyJwt);
router.get("/dashboard", adminControllers.adminDashboard);
router.get("/logout", adminControllers.logout);

// *********************** */
//
// ORDER ROUTES
//
// *********************** */

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderById);
router.put("/orders/:id/update", orderController.updateOrder);
router.delete("/orders/:id/delete", orderController.deleteOrder);
router.put("/orders/:id/delivered", orderController.deliveredOrder);

// *********************** */
//
// PRODUCT ROUTES
//
// *********************** */

router.get("/products", productControllers.getProducts);

router.get("/products/:id", productControllers.getProductById);

router.post(
  "/products/create",
  upload.single("file"),
  productControllers.createProduct
);

router.put(
  "/products/:id/update",
  upload.single("file"),
  productControllers.updateProduct
);

router.delete("/products/:id/delete", productControllers.deleteProduct);

module.exports = router;
