import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/front/Header';
import FloatCart from '@/components/front/FloatCart';
import BottomNav from '@/components/front/BottomNav';
import { FaPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { add_to_cart } from '@/reducers/cartSlice';


function ShowMenu({ menu }: any) {
    const { t, i18n } = useTranslation()
    const { app_settings }: any = usePage().props;
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [showToast, setShowToast] = useState(false);




    const handleAddToCart = (meal: any) => {

        try {
            dispatch(add_to_cart({
                ...meal,
                quantity: quantities[meal.id] || 1,

            }));

            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

        } catch (error) {
            console.log(error);
        }
    };










    return (
        <div>
            <Head title='Menu' />
            <Header />

            <h5 className='text-primary text-center font-bold my-10'>{t('food-menu')}</h5>
            <div className="container m-auto px-3">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {menu && menu.map((category: any) => (
                        <div className='grid-item' key={category.id}>
                            <div className='flex items-center'>

                                <img src={`/uploads/${category.image}`} className='w-18 h-18' alt={category.name_en} />
                                <h6 className='mx-3 flex-1 text-right text-white'>{i18n.language === 'ar' ? category.name_ar : category.name_en}</h6>
                            </div>

                            {category && category.meals.map((meal: any) => (
                                <div className='bg-gray-900 my-1 flex items-center p-1 py-2'>
                                   
                                    <div className='mx-2 flex-1 flex justify-between'>
                                        <p className='text-white text-sm'>{i18n.language === 'ar' ? meal.name_ar : meal.name_en}</p>

                                        <div className='flex items-center'>
                                            <p className='text-white text-sm mx-1'>{meal.price} </p>
                                            <p className='text-white text-sm mx-1'>{i18n.language === 'ar' ? app_settings.currency_ar : app_settings.currency_en}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => handleAddToCart(meal)} className='bg-primary p-2 rounded-md'><FaPlus color='white' size={15} /></button>
                                    </div>
                                </div>
                            ))}



                        </div>
                    ))}

                </div>
            </div>


            {showToast && (
                <div className="toast toast-top toast-end z-50">
                    <div className="alert alert-success bg-primary">
                        <span className='text-white'>{t('added-to-cart')}</span>
                    </div>
                </div>
            )}

            <FloatCart />
            <BottomNav />

        </div>
    )
}

export default ShowMenu