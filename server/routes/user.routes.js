const Router = require("express").Router()
const userController = require("../controllers/user.controllers.js");
Router.post('/create', userController.createUser);
Router.post('/auth', userController.userAuth);
Router.get('/test', userController.test);


module.exports = Router
