import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


function MealItem({ image, title, description, price, currency, increaseQuantity, decreaseQuantity, quantity, addCart }: any) {
    return (
        <div className='group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-700 hover:border-orange-500/50'>
            {/* Image Section */}
            <div className='relative overflow-hidden h-40 sm:h-48'>
                <img 
                    src={image} 
                    alt={title}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                
                {/* Price Badge */}
                <div className='absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg'>
                    {price} {currency}
                </div>
            </div>

            {/* Content Section */}
            <div className='p-4 flex flex-col h-32'>
                <h3 className='text-white text-base mb-2 arabic-font line-clamp-1 group-hover:text-orange-400 transition-colors duration-300'>
                    {title}
                </h3>
                <p className='text-gray-300 text-sm mb-4 line-clamp-2 flex-grow'>
                    {description}
                </p>
                
                {/* Action Section */}
                <div className='flex justify-between items-center mt-auto'>
                    {/* Quantity Controls */}
                    <div className='flex items-center bg-gray-800 rounded-full p-1 border border-gray-600'>
                        <button
                            onClick={decreaseQuantity}
                            className='w-8 h-8 rounded-full bg-gray-700 hover:bg-orange-600 flex justify-center items-center text-white transition-colors duration-200 text-sm'
                        >
                            <FaMinus />
                        </button>

                        <span className='w-10 text-white text-center font-medium text-sm'>
                            {quantity}
                        </span>

                        <button
                            onClick={increaseQuantity}
                            className='w-8 h-8 rounded-full bg-gray-700 hover:bg-orange-600 flex justify-center items-center text-white transition-colors duration-200 text-sm'
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={addCart} 
                        className='bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2'
                    >
                        <FaPlus className='text-xs' />
                        <span className='hidden sm:inline'>Add</span>
                    </button>
                </div>
            </div>

            {/* Subtle shine effect on hover */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none'></div>
        </div>
    )
}

export default MealItem