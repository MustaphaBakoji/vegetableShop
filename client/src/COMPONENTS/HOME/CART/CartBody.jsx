// Cart.js
import React, { useState } from 'react';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../REDUX_STORE/cartSlice';


function Cart() {
    let dispatch = useDispatch()
    let items = [
        { id: 1, name: 'Product 1', price: 1000, image_url: 'https://example.com/product1.jpg', quantity: 1 },
        { id: 2, name: 'Product 2', price: 2000, image_url: 'https://example.com/product2.jpg', quantity: 1 },
        // Add more items as needed
    ]




    return (
        <>
            <div className=' absolute bg-black opacity-80 w-full h-full  z-40' onClick={() => { dispatch(cartActions.toggleCart()) }} />
            <div className="flex flex-wrap justify-center items-center absolute z-50 bg-white opacity-70 rounded shadow-inner w-[80vw] sm:w-[50vw] top-[15vh] right-[10vw] sm:right-[25vw] ">
                {items.map((item) => (
                    <CartItem
                        name={item.name}
                        key={item.id}
                        item={item}
                        price={item.price}

                    />
                ))}

            </div></>
    );
}

export default Cart;
