let Cloudinary = require("cloudinary").v2

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
// let image_url = image.secure_url;
// let { name, price, } = JSON.parse(req.headers.properties);
// PerfumeModel.create({ name, image_url, price });
module.exports = Cloudinary