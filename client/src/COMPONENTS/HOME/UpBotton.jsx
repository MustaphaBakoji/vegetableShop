import { scrollInfo } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { FaArrowUp91 } from 'react-icons/fa6'

function UpBotton() {

    useEffect(() => {
        window.addEventListener('scroll', (e) => { })


    }, [])

    return (

        <div className=' absolute top-[80%] text-green-800 right-6'><button><FaArrowAltCircleUp className=' w-8 h-8' /></button></div>
    )
}

export default UpBotton