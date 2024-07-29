// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY;

// function generateToken(user) {
//     if (user) {
//         let signedToken = jwt.sign(
//             {
//                 data: user._id,
//                 exp: new Date().setDate(new Date().getDate() + 1)
//             },
//             "1234567890"
//         );
//         return signedToken;
//     }
//     return new Error('userException: user not found');
// }


// function authorization(req, res, next) {
//     const authorization = req.headers.authorization;
//     if (!authorization) {
//         return res.status(401).json({
//             message: 'No Authorization Header'
//         })
//     }
//     try {
//         const token = authorization.split('Bearer ')[1];
//         if (!token) {
//             return res.status(401).json({
//                 message: 'Invalid Token Format'
//             })
//         }
//         const decode = jwt.verify(token, SECRET_KEY);
//         req.user = decode
//         next()
//     } catch (error) {
//         if (error instanceof jwt.TokenExpiredError) {
//             return res.status(401).json({
//                 message: 'Session Expired',
//                 error: error.message,
//             })
//         }
//         if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
//             return res.status(401).json({
//                 message: 'Invalid Token',
//                 error: error.message,
//             })
//         }
//         res.status(500).json({
//             message: 'Internal server Error',
//             error: error.message,
//             stack: error.stack
//         });
//     }
// }

// module.exports = { generateToken, authorization }