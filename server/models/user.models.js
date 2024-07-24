const mongoose = require('mongoose');
const PassportLocalMongoose = require('passport-local-mongoose');
const UserScheme = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: [true, "Email already exist"]
        },
        username: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user'
        },

    },
    {
        timestamps: true,
    }
);

UserScheme.plugin(PassportLocalMongoose)

module.exports = mongoose.model('User', UserScheme);
