const mongoose = require("mongoose");

const scheme = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product must be provided"],
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Buyer is required"],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      required: [true, "Payment method is required"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      required: [true, "Payment status is required"],
      default: "unpaid",
    },
    delivered: {
      type: Boolean,
      required: [true, "Delivered status is required"],
      default: false,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

const order = mongoose.model("order", scheme);

module.exports = order;
