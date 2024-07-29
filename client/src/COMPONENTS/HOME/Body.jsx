import React from 'react'
import ImageCard from './ImageCard'

function Body() {
    let items = [1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    return (
        <div className='mt-4 grid-cols-1 place-items-center md:grid md:grid-cols-3 gap-5 ml-4'>
            {
                items.map(item => {
                    return <ImageCard image_url={require('../../statics/tomato.jpeg')} name={'tomato'} price={900} />
                })
            }




        </div>
    )
}

export default Body