const mongoose = require('mongoose');


const ProductScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name must be provided']
    },
    price: {
        type: String,
        required: [true, 'Product price has to be provided']
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Products = mongoose.model('Products', ProductScheme)

module.exports = Products