const express = require("express");
require("dotenv").config();
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);
const app = express();
const GlobalError = require("./Utils/Error");
const Admin = require("./models/user.models");
const router = require("./routes/index.routes");
const cors = require("cors");

const store = new MongoDBstore({
  uri: process.env.DB_URI,
  collection: "sessions",
});
store.on("error", function (error) {
  throw new Error("Session store error: " + error);
});

app.use(
  session({
    store: store,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true, // Ensures cookies are sent only over HTTP(S), not client JS
      secure: false, // Ensures cookies are sent only over HTTPS
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
  })
);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 4000 || process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")({ origin: "*" }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));

passport.use(Admin.Account.createStrategy());

passport.serializeUser((user, done) => {
  console.log("serializing user");
  done(null, { id: user.id, type: user.role });
  console.log("serialized user");
});

passport.deserializeUser((obj, done) => {
  console.log("deserial");
  console.log("in if");
  Admin.Account.findById(obj.id)
    .then((user) => {
      console.log("done");
      done(null, user);
    })
    .catch((err) => {
      done(null, err);
    });
});
// src/routes/auth.routes.js


const router = express.Router();
const axios = require("axios");
const authenticateToken = require("../middleware/auth");

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:4001";

// Register
router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/auth/login`, req.body);
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

app.use("/", router);
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   console.log(
//     "middleware",
//     req.session,
//     req.isAuthenticated(),
//     "Session token ",
//     req.session.token
//   );
//   return next();
// });
app.listen(PORT, () => {
  console.log("Conneted to server at port " + PORT);
});

module.exports = app;
