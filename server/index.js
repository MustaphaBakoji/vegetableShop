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