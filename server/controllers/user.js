const passport = require('passport');
const userModels = require('../models/user.models');
const mongoose = require('mongoose');


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
            })
        }
        req.login(user, function (err) {
            if (err) return res.status(500).json({
                status: "fail",
                message: "failed to create session",
                error: err
            });

            // Successfully authenticated and session created
            res.status(201).json({
                status: "success",
                message: " user created"
            })
            return next()
        });

    })
}

function userLogin(req, res, next) {
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
            if (req.user.role === 'admin') {
                res.status(200).json({
                    status: 'success',
                    message: 'authentication success',
                    redirect: '/admin/panel'
                })
                return next()
            }
            res.status(200).json({
                status: 'success',
                message: 'redirect to dashboard',
                redirect: '/user/panel'
            })
            return next();
        });
    })(req, res, next)
}

function deleteUser(req, res, next) {
    const uId = mongoose.Types.ObjectId.createFromHexString(req.query.id);
    userModels.findByIdAndDelete(uId)
        .then((deletedAccount) => {
            res.status(200).json({
                status: 'success',
                message: `Account: "${deletedAccount.username}" deleted successfully`,
                redirect: '/signUp'
            })
            return next()
        }).catch((err) => {
            return res.status(500).json({
                status: 'fail',
                message: `could not delete account`,
                error: err
            })
        });
}

function logout(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(500).json({
            status: 'fail',
            message: 'Session unset'
        })
    }
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                status: 'fail',
                message: 'Error logging out user',
                error: err,
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'successfully logged out',
            redirect: '/login'
        })
        return next()
    })


}

function test(req, res, next) {

    console.log("user", req.user, req.isAuthenticated(), res.locals.currentUser);
    res.status(200).json({ user: req.user, logged: req.isAuthenticated() })
    return next()
}

module.exports = { createUser, userLogin, test, deleteUser, logout }