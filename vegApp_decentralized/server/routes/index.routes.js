const Routes = require("express").Router()
const userRouter = require("./User.routes");
const adminRouter = require("./Admin.routes");
const homeRouter = require('../routes/Home.routes')

Routes.use('/home', homeRouter)
Routes.use('/user', userRouter);
Routes.use('/admin', adminRouter);
// Routes.use('/')
module.exports = Routes
