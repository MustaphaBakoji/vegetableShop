
import React, { useEffect, useState } from 'react'
import { FaHeartCirclePlus } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"
function ImageCard({ name, price, image_url }) {
    const [isMobile, setIsMobile] = useState(null)
    const [showIcons, setshowIcons] = useState(false)
    useEffect(() => {
        if (window.innerWidth < 700) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }


    }, [])
    let IconHandler = () => {
        setshowIcons(true)
    }
    let RemoveIconHandler = () => {
        setshowIcons(false)
    }
    return (
        <div className=' sm:w-[370px] sm:h-[440px] rounded grid grid-rows-2 border-[1px] hover:border-green-400 border-gray-800 place-items-center pt-6 z-0' onMouseOver={IconHandler} onMouseOut={RemoveIconHandler} >
            <div className="image w-[280px] h-[240px] relative z-0 "><div className=' relative'><img src={image_url} alt="" className='z-0 absolute' /></div>
                {(isMobile || showIcons) && <div className="icons(cart/search) absolute bottom-8 right-10 left-10 flex justify-between w-44 ">
                    <FaHeartCirclePlus className='  w-7 h-7 rounded-full text-green-800' />
                    < FaSearch className='  w-7 h-7 rounded-full  text-green-800' />

                </div>}

            </div>
            <div>
                <p className=' font-mono text-2xl'>{name}</p>
                <p className='font-mono text-2xl text-green-800'>&#8358;{price}</p>
                <button className=' w-[200px] h-12 bg-green-700 rounded hover:bg-transparent hover:border-[1px] hover:border-green-800 text-white hover:text-green-900 font-mono text-2xl'>Buy</button>
            </div>

        </div>
    )
}

export default ImageCard