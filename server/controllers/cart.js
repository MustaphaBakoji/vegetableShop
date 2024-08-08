const { request } = require('express');
const userModels = require('../models/user.models');
const cartModel = require('../models/user.models');

async function createCart(req, res, next) {
    let { productId } = request.body
    let user = req.user.id
    let userExist = await cartModel.findOne({ user })
    if (userExist) {
        userExist.cartItems.push(productId);
        userExist.save()
        res.status(200).json({
            status: 'success',
            message: 'product added to cart'
        })
    }
    else {
        cartModel.create({ user, cartItems: [productId] })
        res.status(200).json({
            status: 'success',
            message: `product added to cart`
        })
        return next()
    }

}