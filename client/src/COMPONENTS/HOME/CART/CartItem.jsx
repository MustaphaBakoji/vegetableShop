// CartItem.js
import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';


function CartItem({ name, price, image_url, }) {
    return (
        <motion.div
            className='w-[80%] sm:w-[60%] border-b-[1px] border-gray-700 rounded p-2'
        >
            <div className='flex justify-between items-center'>
                <div><img src={require("../../../statics/tomato.jpeg")} alt="CartImage" className=' w-14 h-14 rounded ' /></div>
                <div ><p className=' text-green-700 text-2xl font-mono'>{name}</p> <p className='font-thin text-gray-600' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, atque. Eos perferendis aspernatur saepe dolores mollitia. Quam quod praesentium fugit?</p></div>
                <div className='text-gray-600 hover:text-green-700'><FaTrash /></div>
            </div>
            <div className="flex justify-around ">
                <div className=' w-36 h-8  text-green-700 '>

                    <button className='w-12 h-8 border-gray-700 border-[1px] border-r-0 hover:border-green-700 rounded-tl-full rounded-bl-full'>+</button>
                    <button className='w-12 h-8 border-gray-700 border-[1px] hover:border-green-700 font-bold'>1</button>
                    <button className='w-12 h-8 border-gray-700 border-[1px] border-l-0 hover:border-green-700 rounded-tr-full rounded-br-full'>-</button>


                </div>
                <p className='text-green-700 font-mono text-2xl'>{price}</p>
            </div>

        </motion.div>
    );
}

export default CartItem;
