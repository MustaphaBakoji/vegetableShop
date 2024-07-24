const Router = require("express").Router()
const userController = require("../controllers/user.controllers.js");
Router.post('/create', userController.createUser);


module.exports = Router
