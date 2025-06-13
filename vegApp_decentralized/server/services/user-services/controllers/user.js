const passport = require("passport");
const userModels = require("../models/user.models");
const jwt = require("../../../Utils/jwt");
// const order = require("../models/order.models");


function dashboard(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(500).json({
        status: "fail",
        message: "Session unset",
      });
    }
  res.status(200).json({
    status: "success",
    message: "dashboard",
    user: req.user,
  });
}

function createUser(req, res, next) {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body?.phoneNumber,
    address: req.body?.address,
  };
  const User = new userModels.User(newUser);
  userModels.User.register(User, req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: " user not created  :try again",
        error: err,
      });
    }
    if (!user) {
      return res.status(500).json({
        status: "fail",
        message: " user not created  :try again",
      });
    }
    req.login(user, function (err) {
      if (err)
        return res.status(500).json({
          status: "fail",
          message: "failed to create session",
          error: err,
        });

      // Successfully authenticated and session created
      req.session.token = jwt.generateToken(req.user);
      res.status(201).json({
        status: "success",
        message: " user created",
        user: user,
      });
      return next();
    });
  });
}

function userLogin(req, res, next) {
  passport.authenticate("local", function (err, user) {
    // console.log("user", user);
    if (!user)
      return res.status(403).json({
        status: "fail",
        message: "incorrect username or password ",
      });
    if (err)
      return res.status(500).json({
        status: "fail",
        message: "failed to authenticate user",
        error: err,
      });
    req.login(user, function (err) {
      if (err)
        return res.status(500).json({
          status: "fail",
          message: "failed to create session",
          error: err,
        });
      // Successfully authenticated and session created
      res.locals.currentUser = req.user;
      req.session.token = jwt.generateToken(req.user);
      if (req.user.role === "admin") {
        res.status(200).json({
          status: "success",
          message: "authentication success",
          redirect: "/admin/panel",
        });
        return next();
      }
      res.status(200).json({
        status: "success",
        message: "redirect to dashboard",
        redirect: "/user/dashboard",
        user: req.user,
      });
      return next();
    });
  })(req, res, next);
}

function updateUser(req, res, next) {
  const uId = req.user._id;
  userModels.User.findByIdAndUpdate(uId, req.body, { new: true })
    .then((updatedAccount) => {
      res.status(200).json({
        status: "success",
        message: `Account: "${updatedAccount.username}" updated successfully`,
        user: updatedAccount,
        redirect: "/user/dashboard",
      });
      return next();
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: `could not update account`,
        error: err,
      });
    });
}

function deleteUser(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(500).json({
      status: "fail",
      message: "Session unset",
    });
  }
  if (req.isAuthenticated() && String(req.user.id) !== req.body.id) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
  const uId = req.use._id;
  userModels.User.findByIdAndDelete(uId)
    .then(async (deletedAccount) => {
        await order.deleteMany({ user: req.user.id });
      res.status(200).json({
        status: "success",
        message: `Account: "${deletedAccount.username}" deleted successfully`,
        redirect: "/signUp",
      });
      return next();
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: `could not delete account`,
        error: err,
      });
    });
}

function logout(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(500).json({
      status: "fail",
      message: "Session unset",
    });
  }
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Error logging out user",
        error: err,
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully logged out",
      redirect: "/login",
    });
    return next();
  });
}



function test(req, res, next) {
  console.log("user", req.user, req.isAuthenticated(), res.locals.currentUser);
  res.status(200).json({ user: req.user, logged: req.isAuthenticated() });
  return next();
}

module.exports = {
  dashboard,
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  logout,
  test,
};
