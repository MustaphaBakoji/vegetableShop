const { User } = require("../models/user.models");


function addToCart(req, res, next) {
  const newCartProduct = {
    user: req.user.id,
    product: req.params.productId,
  };
      User.findByIdAndUpdate(
        req.user.id,
        { $addToSet: { cart: newCartProduct } },
        { new: true }
      )
        .then((updatedUser) => {
          req.user = updatedUser;
          return res.status(200).json({
            updatedUser,
            status: "success",
            message: "Product added to cart",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            status: "Failed",
            error,
            message: "Failed to update Account",
          });
        });
   
}

function getCart(req, res, next) {
  User.findById(req.user._id)
    .populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Products",
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }
      return res.status(200).json({
        status: "success",
        cart: user.cart,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Failed",
        error,
        message: "Failed to get cart",
      });
    });
}

function updateCart(req, res, next) {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({
      status: "Failed",
      message: "Product ID and quantity are required",
    });
  }

  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }

      const cartItem = user.cart.find(
        (item) => item._id.toString() === productId.toString()
      );
      if (!cartItem) {
        return res.status(404).json({
          status: "Failed",
          message: "Product not found in cart",
        });
      }

      cartItem.quantity = quantity;

      return user.save();
    })
    .then((updatedUser) => {
      return res.status(200).json({
        status: "success",
        message: "Cart updated successfully",
        cart: updatedUser.cart,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Failed",
        error,
        message: "Failed to update cart",
      });
    });
}

function removeFromCart(req, res, next) {
  const productId = req.params.productId;

  User.findByIdAndUpdate(
    req.user.id,
    { $pull: { cart: { _id: productId } } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Product removed from cart",
        cart: updatedUser.cart,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "Failed",
        error,
        message: "Failed to remove product from cart",
      });
    });
}

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};
