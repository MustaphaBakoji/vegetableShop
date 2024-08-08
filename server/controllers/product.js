const { default: mongoose } = require('mongoose');
const Product = require('../models/products.models');
const Cloudinary = require('../Utils/cloudinary')


function createProduct(req, res, next) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;


    Cloudinary.uploader.upload(dataURI, { folder: 'vegetables' }, function (err, results) {
        console.log(req.file);
        if (err) {
            return res.status(500).json({
                status: "fail",
                message: 'failed to upload image',
                error: err
            });
        }
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            imageUrl: results.url
        }


        Product.create(newProduct)
            .then((uploadedProduct) => {
                res.status(201).json({
                    status: "success",
                    message: 'image uploaded successfully',
                    product: uploadedProduct,
                    data: results
                });
                return next();
            }).catch((err) => {
                return res.status(500).json({
                    status: "fail",
                    message: 'failed to create product',
                    error: err
                });
            });

    })
}

function updateProduct(req, res, next) {
    Product.findByIdAndUpdate({ id: req.body.id }, { name: req.body.name, price: req.body.price }, { new: true })
        .then((updatedProduct) => {
            res.status(200).json({
                status: 'successful',
                message: `Updated Product: ${updatedProduct.name}`
            })
            return next()
        }).catch((err) => {
            return res.status(500).json({
                status: 'fail',
                message: 'Could not update product',
                error: err
            })
        });
}

function deleteProduct(req, res, next) {
    const productId = mongoose.Types.ObjectId.createFromHexString(req.query.productId);
    Product.findByIdAndDelete(productId)
        .then((deletedProduct) => {
            res.status(200).json({
                status: 'success',
                message: `deleted ${deletedProduct.name}`
            });
            return next();
        }).catch((err) => {
            return res.status(500).json({
                status: "fail",
                message: 'failed to delete product',
                error: err
            });
        });

}

module.exports = { createProduct, updateProduct, deleteProduct }