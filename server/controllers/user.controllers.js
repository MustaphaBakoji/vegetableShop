const passport = require('passport');
const userModels = require('../models/user.models');
const GlobalError = require('../utils/Error');
function createUser(req, res, next) {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
    }

    const User = new userModels(newUser);
    userModels.register(User, req.body.password, (error, user) => {
        if (!user) {
            let ERO=new GlobalError(error.message,500)
            return next(ERO)
            // return res.status(500).json({
            //     status: "fail",
            //     message: " user not created  :try again",
            //     error: error
            // })
        }
        return res.status(201).json({
            status: "success",
            message: " user created"
        })
    })
}

module.exports = { createUser }