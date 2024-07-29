let Cloudinary = require("cloudinary").v2

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_SECRET,
    api_secret: process.env.CLOUDINARY_SECRET
})
// const b64 = Buffer.from(req.file.buffer).toString("base64");
    // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // let image = await Cloudinary.uploader.upload(dataURI, { folder: 'Perfumes' });
    // let image_url = image.secure_url;
    // let { name, price, } = JSON.parse(req.headers.properties);
    // PerfumeModel.create({ name, image_url, price });
module.exports = Cloudinary