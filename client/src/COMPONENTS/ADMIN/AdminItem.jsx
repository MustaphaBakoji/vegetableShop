import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

function AdminItem() {
    return (
        <motion.div className=' grid grid-cols-3 w-[90%] m-auto border-gray-600 hover:border-green-700 border-[1.5px] rounded-md h-32 bg-[rgb(22,101,52, 0.2)] hover:text-opacity-100 place-items-center mt-2 mb-2 ' initial={{ scale: 0, }} whileInView={{ scale: 1 }} >
            <img src={require("../../statics/tomato.jpeg")} alt="" className=' h-28 w-28 rounded-full' />
            <p className='font-mono text-2xl text-green-800 '>Name</p>
            <div><p>N900</p></div>
        </motion.div>
    )
}

export default AdminItem