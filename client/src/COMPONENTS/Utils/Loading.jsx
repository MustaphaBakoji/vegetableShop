import { motion } from 'framer-motion'
import React from 'react'
import { GiThreeLeaves } from 'react-icons/gi'

function Loading() {
    return (
        <div className='relative'>
            <div className=' absolute w-full h-full bg-black opacity-70 z-40' />
            <div className="absolute w-30 h-30 top-[30vh] right-[45vw] sm:right-[40vw]  z-50">
                <motion.p initial={{ rotate: 360, color: "rgba(0,0,0,0)" }} animate={{ rotate: 0, color: "rgb(47,133,90)" }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }} className=' w-20 h-20 top-10' > <GiThreeLeaves className=' w-14 h-14 ' /></motion.p>

                <motion.p initial={{ rotate: 0, color: "rgb(256,256,256)" }} animate={{ color: "rgb(47,133,90)", rotate: 360, }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }} className=' w-20 h-20 top-10' > <GiThreeLeaves className=' w-14 h-14 ' /></motion.p>

            </div>
        </div >
    )
}

export default Loading