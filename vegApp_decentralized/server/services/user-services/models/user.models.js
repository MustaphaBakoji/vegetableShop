const mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose");
const AccountScheme = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exist"],
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

AccountScheme.plugin(PassportLocalMongoose, {
  usernameField: "email",
});

const Account = mongoose.model("Account", AccountScheme);
const Admin = Account.discriminator("Admin", {});
const User = Account.discriminator(
  "User",
  new mongoose.Schema({
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: [],
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
      },
    ],
    address: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
  })
);
const Moderator = Account.discriminator("Moderator", {});

// const Admin = mongoose.model('Admin')

module.exports = { Admin, Account, User, Moderator };
