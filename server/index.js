let express = require('express');
require('dotenv').config();
let passport = require('passport');
let mongoose = require('mongoose');
let session = require('express-session');
let app = express();
const GlobalError = require("./Utils/Error")
const Admin = require("./models/user.models")
let Router = require('./routes/index.routes')


app.use(session({
    cookie: { name: "user", secret: process.env.SECRET_KEY, expires: 60000 },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY
}))

mongoose.connect('mongodb://127.0.0.1:27017/vegDB')
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

passport.use(Admin.createStrategy());
passport.serializeUser((user, done) => {
    console.log("serializing user")
    done(null, { id: user.id, type: user.role });
});

passport.deserializeUser((obj, done) => {
    console.log("deserial")
    if (obj.type === 'user') {
        console.log("in if")
        Admin.findById(obj.id)
            .then((user) => {
                console.log("done");
                done(null, user);
            }).catch((err) => {
                done(null, err);
            });
    } else if (obj.type === 'admin') {
        Admin.findById(obj.id, (err, admin) => {
            done(err, admin);
        });
    }
});


app.use("/", Router)
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    console.log("middleware", req.session, req.isAuthenticated());
    return next();
})
app.listen(PORT, () => {
    console.log('Conneted to server at port' + PORT);
})


