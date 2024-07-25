const Product = require('../models/products.models');
const multer = require('../Utils/multer');
const Cloudinary = require('cloudinary').v2


async function createProduct(req, res, next) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    let image = await Cloudinary.uploader.upload(dataURI, { folder: 'Perfumes' });
    let image_url = image.secure_url;
    let { name, price, } = JSON.parse(req.headers.properties);
    PerfumeModel.create({ name, image_url, price });

    return next()
}

function updateProduct(params) {
    
}
function deleteProduct(params) {
    
}

module.exports = { createProduct, updateProduct, deleteProduct }