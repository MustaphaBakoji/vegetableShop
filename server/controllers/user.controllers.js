const passport = require('passport');
const userModels = require('../models/user.models');
function createUser(req, res, next) {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
    }

    const User = new userModels(newUser);
    userModels.register(User, req.body.password, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: "fail",
                message: " user not created  :try again",
                error: err
            })
        }
        if (!user) {
            return res.status(500).json({
                status: "fail",
                message: " user not created  :try again",
                error: err
            })
        }
        req.login(user, function (err) {
            if (err) return res.status(500).json({
                status: "fail",
                message: "failed to create session",
                error: err
            });

            // Successfully authenticated and session created
            return res.status(201).json({
                status: "success",
                message: " user created"
            })
        });

    })
}

function userAuth(req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (!user) return res.status(403).json({
            status: "fail",
            message: "incorrect username or password "
        })
        if (err) return res.status(500).json({
            status: "fail",
            message: "failed to authenticate user",
            error: err
        })
        req.login(user, function (err) {
            if (err) return res.status(500).json({
                status: "fail",
                message: "failed to create session",
                error: err
            });
            
            // Successfully authenticated and session created
            res.locals.currentUser = req.user
            // req.session.save()
            res.status(200).json({
                status: "success",
                message: "user authenticated successfully",
                user: req.user
            });
            return next()
        });
    })(req, res, next)
}

function test(req, res, next) {

    console.log("user", req.user, req.isAuthenticated(), res.locals.currentUser);
    res.status(200).json({ user: req.user, logged: req.isAuthenticated() })
    return next()
}

module.exports = { createUser, userAuth, test }