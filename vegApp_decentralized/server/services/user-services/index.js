// === user-service/index.js ===
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/auth.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connect
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("User service connected to DB"))
  .catch((err) => console.error(err));

// Passport setup
require("./config/passport")(passport);
app.use(passport.initialize());

app.use("/api/users", userRoutes);
// app.use("")

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User service listening on port ${PORT}`));