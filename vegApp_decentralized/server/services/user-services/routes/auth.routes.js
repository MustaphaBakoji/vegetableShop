// src/routes/auth.routes.js

const express = require("express");
const router = express.Router();
const axios = require("axios");
const { authenticateToken } = require("../utils/jwt");

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:4001";

// Register
router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/auth/register`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/auth/login`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Protected Profile Route
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/auth/profile`, {
      headers: { Authorization: req.headers["authorization"] },
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

module.exports = router;
