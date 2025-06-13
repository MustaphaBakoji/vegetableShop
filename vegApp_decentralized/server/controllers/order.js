const order = require("../models/order.models");
const userModel = require("../models/user.models");

function getOrders(req, res, next) {
  order
    .find({ buyer: req.user.id })
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

function getAllOrders(req, res, next) {
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

function getOrderById(req, res, next) {
  order
    .find({ _id: req.params.id, buyer: req.user._id })
    .then((order) => {
      return res.status(200).json({
        order,
        status: "success",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Failed",
        error,
        message: "Failed to get order",
      });
    });
}

function createOrder(req, res, next) {
  const newOrder = {
    product: req.body.productId,
    price: req.body.price,
    buyer: req.user._id,
    status: "pending",
    address: req.body.address || req.user.address,
    phoneNumber: req.body.phoneNumber || req.user.phoneNumber,
    paymentMethod: req.body.paymentMethod,
    paymentStatus: req.body.paymentStatus,
    createdAt: Date.now(),
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

function payOrder(req, res, next) {
  const orderId = req.params.id;
  const paymentMethod = req.body.paymentMethod;
  const paymentStatus = req.body.paymentStatus;
  const updateData = {
    paymentMethod,
    paymentStatus,
  };

  if (updateData.paymentMethod === "card") {
    updateData.paymentStatus = "paid";
  } else {
    updateData.paymentStatus = "unpaid";
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
        message: "Failed to update order for payment",
        error: err,
      });
    });
}

function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const updateData = {
    delivered: req.body.delivered,
  };
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

function deleteOrder(req, res, next) {
  const orderId = req.params.id;
  order.findByIdAndDelete(orderId).then((deletedOrder) => {
    if (!deletedOrder) {
      return res.status(404).json({
        status: "fail",
        message: "order not found",
        error: err,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  });
}

function deliveredOrder(req, res, next) {
  const orderId = req.params.id;
  console.log(req.body.delivered);
  const updateData = {
    delivered: req.body.delivered,
    deliveredAt: req.body.delivered === "true" ? Date.now() : null,
  };
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

function cancelOrder(req, res, next) {
  const orderId = req.params.id;
  const updateData = {
    status: "cancelled",
  };
  order
    .findByIdAndUpdate(orderId, updateData, { new: true })
    .then((updatedOrder) => {
      if (!updatedOrder) {
        return res.status(404).json({
          status: "fail",
          message: "order not found",
        });
      }
      return res
        .status(200)
        .json({
          status: "success",
          message: "Order updated successfully",
          order: updatedOrder,
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

function searchOrders(req, res, next) {
  const searchQuery = req.query.search;
  const searchRegex = new RegExp(searchQuery, "i");
  order
    .find({
      $or: [
        { product: { $regex: searchRegex } },
        { buyer: { $regex: searchRegex } },
        { status: { $regex: searchRegex } },
      ],
    })
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
        message: "Failed to get order",
      });
    });
}

module.exports = {
  createOrder,
  getOrders,
  getAllOrders,
  getOrderById,
  payOrder,
  updateOrder,
  deleteOrder,
  deliveredOrder,
  cancelOrder,
  searchOrders,
};
