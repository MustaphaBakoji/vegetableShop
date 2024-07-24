let Cloudinary = require("cloudinary").v2
let express = require('express');
require('dotenv').config();
let passport = require('passport');
let mongoose = require('mongoose');
let session = require('express-session');
let app = express();
const GlobalError = require("./Utils/Error")
let Router = require('./routes/index.routes')

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

mongoose.connect('mongodb://localhost:27017/vegDB')
    .then(() => {
        console.log('connected to db')
    }).catch((err) => {
        console.log(err)
    });

let PORT = 4000 || process.env.PORT
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


app.use("/", Router)
app.listen(PORT, () => {
    console.log('Conneted to server at port' + PORT);
})


