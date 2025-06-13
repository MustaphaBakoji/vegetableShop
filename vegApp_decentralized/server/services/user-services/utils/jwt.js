// src/middleware/auth.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateToken(user) {
  if (user) {
    let signedToken = jwt.sign(
      {
        data: user._id,
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.JWT_SECRET
    );
    return signedToken;
  }
  return new Error("userException: user not found");
}

module.exports = {authenticateToken, generateToken};
