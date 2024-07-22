const Cloudinary = require("cloudinary").v2
const express = require('express');
require('dotenv').config();
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express()

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_SECRET,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.use(session({
    cookie: { name: "user", secret: process.env.SECRET_KEY },
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY
}))

mongoose.connect('')
    .then(() => {
        console.log('connected to db')
    }).catch((err) => {
        console.log(err)
    });

const PORT = 4000 || process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')({ origin: "*" }));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user.role });
  });
  
  passport.deserializeUser((obj, done) => {
    if (obj.type === 'user') {
      User.findById(obj.id, (err, user) => {
        done(err, user);
      });
    } else if (obj.type === 'admin') {
      Admin.findById(obj.id, (err, admin) => {
        done(err, admin);
      });
    }
  });

app.listen(PORT, ()=>{
    console.log('Conneted to server');
})


