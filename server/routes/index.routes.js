const Routes = require("express").Router()
const userRouter = require("./user.routes");
const adminRouter = require("./Admin.routes");

Routes.use('/user', userRouter);
Routes.use('/admin', adminRouter);

module.exports = Routes
