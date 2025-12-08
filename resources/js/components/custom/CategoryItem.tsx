import { Link } from '@inertiajs/react'
import React from 'react'

export default function CategoryItem({image,title , link}:any) {
    return (
        <Link href={link} className='item flex flex-col justify-center items-center'>
            <div className='rounded-full overflow-hidden w-28 h-28'>
                <img src={image} className='w-28 h-28' alt={title} />
            </div>
            <h5 className='text-center mt-2  text-white arabic-font'>
                {title}
            </h5>
        </Link>
    )
}
