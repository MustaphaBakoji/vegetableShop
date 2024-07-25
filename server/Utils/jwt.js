const jwt = require('jso')

function generateToken(user) {
    if (user) {
        let signedToken = jwt.sign(
            {
                data: user._id,
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            "1234567890"
        );
        return signedToken;
    }
    return new Error('userException: user not found');
}

module.exports = generateToken