let Routes = require("express").Router()
let customerRouter = require("./customer.routes");

Routes.use('/user', customerRouter);

module.exports = Routes
