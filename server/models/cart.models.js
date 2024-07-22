const mongoose = require('mongoose');

const CartScheme = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USer'
        },
        cartItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producs'
        }],


    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Cart.models', CartScheme);
