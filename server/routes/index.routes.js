let Routes = require("express").Router()
let customerRouter = require("./user.routes");

Routes.use('/user', customerRouter);

module.exports = Routes
