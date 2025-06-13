const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');  // your configured Cloudinary instance
const path = require('path');

// configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vegetables',
    //adds an extra file extention, hence it got commented
    // format: async (req, file) => file.mimetype.split('/')[1], // jpeg, png, etc
    public_id: (req, file) => {
  const nameOnly = path.parse(file.originalname).name; // "Picture3"
  return `${Date.now()}-${nameOnly}`;
}
  },
});

const upload = multer({ storage });

module.exports = upload;
