import React from 'react'
import { FaPlus, FaTrash } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import { decrease_quantity, increase_quantity, remove_from_cart } from '@/reducers/cartSlice';

export default function CartItem({ item }: { item: any }) {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const { app_settings }: any = usePage().props;
    const cart = useSelector((state: any) => state.cart.meals);


    const handleIncreaseQuantity = (id: number) => {
        dispatch(increase_quantity(id))
    }


    const handleDecreaseQuantity = (id: number) => {
        dispatch(decrease_quantity(id))
    }


    const handleDeleteitem = (id: number) => {
        dispatch(remove_from_cart(id))
    }

    return (
        <div key={item.id} className='mb-3 flex items-center'>
            <div>
                <img src={`${item.image}`} className='w-16 h-16' alt={item.name_ar} />
            </div>
            <div className='flex-1  mx-1'>
                <h5 className='text-white'>
                    {i18n.language === 'ar' ? item.name_ar : item.name_en}
                </h5>
                <div className='text-primary flex'>

                    <p className='mx-1'> {item.price}</p>
                    {app_settings ? <p className='mx-1'>{i18n.language === 'ar' ? app_settings.currency_ar : app_settings.currency_en}</p> : ''}


                </div>
                <div className='flex mt-2 '>
                    <button onClick={() => handleIncreaseQuantity(item.id)} className='bg-orange-600 w-6 h-6 rounded-xl flex justify-center items-center'>
                        <FaPlus />
                    </button>
                    <input type="text" className='w-10 text-center' readOnly value={item.quantity} />
                    <button onClick={() => handleDecreaseQuantity(item.id)} className='bg-orange-600 w-6 h-6 rounded-xl flex justify-center items-center'>
                        <FiMinus />
                    </button>
                </div>
            </div>
            <div className='flex justify-center items-center mr-3'>
                <button onClick={() => handleDeleteitem(item.id)} className='bg-red-600 w-10 h-10 rounded-full flex justify-center items-center '><FaTrash /></button>
            </div>
        </div>
    )
}
