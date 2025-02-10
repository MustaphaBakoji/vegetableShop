const order = require("../models/order.models");
const userModel = require("../models/user.models");

function getOrder(req, res, next) {
  order
    .find({})
    .then((orders) => {
      return res.status(200).json({
        orders,
        status: "success",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Failed",
        error,
        message: "Failed to get orders",
      });
    });
}

function userGetOrder(req, res, next) {
  return res.status(200).json({
    orders: req.user.order,
    status: "success",
    message: " order retrieved",
  });
}

function createOrder(req, res, next) {
  const newOrder = {
    productName: req.body.productName,
    price: req.body.price,
    buyer: req.user,
  };

  order
    .create(newOrder)
    .then((orderInfo) => {
      userModel.User.findByIdAndUpdate(
        req.user.id,
        { $addToSet: { order: orderInfo } },
        { new: true }
      )
        .then((updatedUser) => {
          req.user = updatedUser;
          return res.status(200).json({
            orderInfo,
            updatedUser,
            status: "success",
            message: " order created",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            status: "Failed",
            error,
            message: "Failed to update Account",
          });
        });
    })
    .catch((error) => {
      return res.json({
        status: "failed",
        error,
        message: "Failed to create order",
      });
    });
}

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
  userModel.Account.find({ order: orderId }).then((user) => {
    if (req.user._id !== user.id) {
      return res.status(500).json({
        status: "fail",
        message: "Failed to update order",
        error: err,
      });
    }
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
        redirect: "/signUp",
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

module.exports = {
  createOrder,
  deleteOrder,
  getOrder,
  updatedOrder,
  userGetOrder,
};
