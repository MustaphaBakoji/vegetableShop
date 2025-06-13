const passport = require("passport");
const userModels = require("../models/user.models");
const mongoose = require("mongoose");
const jwtAuth = require("../Utils/jwt");
const app = require("../index");
const order = require("../models/order.models");

function createAdmin(req, res, next) {
  const newAdmin = {
    username: req.body.username,
    email: req.body.email,
    role: "admin",
  };
  const Admin = new userModels.Admin(newAdmin);
  userModels.Admin.register(Admin, req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: " user not created try again",
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
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "failed to create session",
          error: err,
        });
      }

      // Successfully authenticated and session created
      req.session.token = jwtAuth.generateToken(req.user);
      console.log("success");
      return res.status(201).json({
        status: "success",
        message: " user created",
        user: req.user,
        tkn: req.session.token,
      });
    });
  });
}

function adminDashboard(req, res, next) {
  return res.status(200).json({
    status: "success",
    message: "",
    user: req.user,
    redirect: "",
  });
}
function adminLogin(req, res, next) {
  passport.authenticate("local", function (err, user) {
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
      req.session.token = jwtAuth.generateToken(req.user);
      // console.log(req.session.token, req.user,'USER')
      if (req.user.role === "admin") {
        return res.status(200).json({
          status: "success",
          message: "authentication success",
          redirect: "/admin/panel",
        });
        // return next()
      }
      console.log("success");
      // req.session.token = jwtAuth.generateToken(req.user.id);
      return res.status(200).json({
        status: "success",
        message: "redirect to dashboard",
        redirect: "/user/panel",
      });
      // return next();
    });
  })(req, res, next);
}

function deleteAdmin(req, res, next) {
  const uId = mongoose.Types.ObjectId.createFromHexString(req.query.id);
  userModels
    .findByIdAndDelete(uId)
    .then((deletedAccount) => {
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
    console.log("not authenticated");
    return res.status(500).json({
      status: "fail",
      message: "Session unset",
    });
  }
  req.logout((err) => {
    console.log("req logout");
    if (err) {
      console.log("logout err");
      return res.status(500).json({
        status: "fail",
        message: "Error logging out user",
        error: err,
      });
    }
    console.log("success logout");
    return res.status(200).json({
      status: "success",
      message: "successfully logged out",
      redirect: "/login",
    });
    // return next()
  });
}

// ******************************************* */
//
// ADMIN ORDER CONTROLLERS
//
//******************************************* */

function updatedOrder(req, res, next) {
  const orderId = req.orederId;
  const updateData = {
    delivered: req.body.delivered,
  };
  if (req.user.role == "admin") {
    order
      .findByIdAndUpdate(orderId, updateData, { new: true })
      .then((updatedOrder) => {
        if (!updatedOrder) {
          return res.status(404).json({
            status: "fail",
            message: "order not found",
          });
        }

        return res.status(200).json({
          status: "success",
          message: "Order updated successfully",
          order: updatedOrder,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "fail",
          message: "Failed to update order",
          error: err,
        });
      });
  }
  userModels.Account.find({ order: orderId }).then((user) => {
    order
      .findByIdAndUpdate(orderId, updateData, { new: true })
      .then((updatedOrder) => {
        if (!updatedOrder) {
          return res.status(404).json({
            status: "fail",
            message: "order not found",
          });
        }

        return res.status(200).json({
          status: "success",
          message: "Order updated successfully",
          order: updatedOrder,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: "fail",
          message: "Failed to update order",
          error: err,
        });
      });
  });
}

function deleteOrder(req, res) {
  const uId = mongoose.Types.ObjectId.createFromHexString(req.query.id);
  order
    .findByIdAndDelete(uId)
    .then((deletedOrder) => {
      return res.status(200).json({
        status: "success",
        message: `Order for "${deletedOrder.productName}" deleted successfully`,
        redirect: "/orders",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: `could not delete account`,
        error: err,
      });
    });
}

function test(req, res, next) {
  console.log("user", req.user, req.isAuthenticated(), res.locals.currentUser);
  res.status(200).json({ user: req.user, logged: req.isAuthenticated() });
  return next();
}

module.exports = {
  createAdmin,
  adminLogin,
  test,
  deleteAdmin,
  logout,
  // createProduct,
  // updateProduct,
  // deleteProduct,
  // getProduct,
  // getProducts,
  // getOrder,
  // getOrders,
  updatedOrder,
  deleteOrder,
  adminDashboard,
};
