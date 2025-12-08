import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux'


import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import Header from '@/components/front/Header';
import { useSelector } from 'react-redux';

import FloatCart from '@/components/front/FloatCart';
import BottomNav from '@/components/front/BottomNav';

import CustomInput from '@/components/custom/CustomInput';
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

import { decrease_quantity, increase_quantity, remove_from_cart } from '@/reducers/cartSlice';




type MealType = {
    id: number;
    title: string;
    name_en: string;
    description_en: string;
    price: number;
    image: string;
};

type Props = {
    categories: { id: number; name_en: string; image: string }[];
    meals: MealType[];
    table?: string;
};






function index({ categories, meals, table }: Props) {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const { app_settings }: any = usePage().props;
    const cart = useSelector((state: any) => state.cart.meals);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        address: '',
        phone: '',
    });


    const handleIncreaseQuantity = (id: number) => {
        dispatch(increase_quantity(id))
    }


    const handleDecreaseQuantity = (id: number) => {
        dispatch(decrease_quantity(id))
    }


    const handleDeleteitem = (id: number) => {
        dispatch(remove_from_cart(id))
    }

    const total = cart.reduce((acc: number, item: any) => {
        return acc + item.price * item.quantity;
    }, 0);


    const handle_send_order = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/send/order', {

            total: total,
            order: cart,
            name: data.name,
            address: data.address,
            phone: data.phone
        }, {
            onSuccess: () => {
                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                if (modal) modal.showModal();
            },
            onError: (errors) => {
                console.log(errors);
                alert('❌ Failed to send order!');
            }
        });
    }



    return (
        <div>
            <Head title='Home' />
            <Header />

            <div className="container mx-auto py-3 pb-50 px-3">
                <h6 className='text-white text-center font-extrabold text-xl mb-20'>
                    {t('checkout')}
                </h6>

                <form onSubmit={handle_send_order}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>

                            <h4 className='text-white text-center mb-5 font-bold'>{t('delivery-info')}</h4>
                            <CustomInput required label={t('name')} type="text" onChange={(e: any) => setData('name', e.target.value)} />
                            <CustomInput required label={t('address')} type="text" onChange={(e: any) => setData('address', e.target.value)} />
                            <CustomInput required label={t('phone')} type="text" onChange={(e: any) => setData('phone', e.target.value)} />

                        </div>
                        <div>
                            <h4 className='text-white text-center mb-5 font-bold'>{t('summery-order')}</h4>
                            {cart && cart.length > 0 ? (
                                <>
                                    {cart.map((item: any) => (
                                        <div key={item.id} className='mb-3 flex items-center'>
                                            <div>
                                                <img src={`/uploads/${item.image}`} className='w-16 h-16' alt={item.name_ar} />
                                            </div>
                                            <div className='flex-1  mx-1'>
                                                <h5 className='text-white'>
                                                    {i18n.language === 'ar' ? item.name_ar : item.name_en}
                                                </h5>
                                                <div className='text-primary flex'>

                                                    <p className='mx-1'> {item.price}</p>
                                                    <p className='mx-1'>{i18n.language === 'ar' ? app_settings.currency_ar : app_settings.currency_en}</p>

                                                </div>
                                                <div className='flex mt-2 '>
                                                    <button onClick={() => handleIncreaseQuantity(item.id)} className='bg-primary w-6 h-6 rounded-xl flex justify-center items-center'>
                                                        <FaPlus />
                                                    </button>
                                                    <input type="text" className='w-10 text-center text-white' readOnly value={item.quantity} />
                                                    <button onClick={() => handleDecreaseQuantity(item.id)} className='bg-primary w-6 h-6 rounded-xl flex justify-center items-center'>
                                                        <FiMinus />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='flex justify-center items-center mr-3'>
                                                <button onClick={() => handleDeleteitem(item.id)} className='bg-red-600 w-10 h-10 flex justify-center items-center rounded-xl'><FaTrash color='white' /></button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className=''>
                                        <div className="text-white font-bold text-lg text-center my-4">
                                            {t('total')}: {total.toFixed(2)} AED
                                        </div>



                                        <button type='submit' className='btn btn-primary w-full'>{t('send-order')}</button>


                                    </div>

                                </>) : (<h5 className='text-white text-center'>{t('cart_empty')}</h5>)}
                        </div>

                    </div>
                </form>


            </div>


            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <div className='flex flex-col items-center justify-center'>
                        <img src={`/uploads/${app_settings.logo}`} className='w-28 h-28' alt={app_settings.title_ar} />
                        <h3 className="font-bold text-lg text-white">{t('order-success')}</h3>
                        <p className="py-4 text-white">{t('thank-you')}</p>
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>




            <FloatCart table={table} />
            <BottomNav />

        </div>
    )
}

export default index