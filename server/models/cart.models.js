const mongoose = require('mongoose');

const CartScheme = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        cartItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }],


    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Cart.models', CartScheme);
