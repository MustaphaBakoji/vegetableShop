const multer = require('multer');

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;