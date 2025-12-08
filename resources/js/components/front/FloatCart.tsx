import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { Link, router, usePage } from '@inertiajs/react';
import { decrease_quantity, increase_quantity, remove_from_cart } from '@/reducers/cartSlice';


type Props = {
    table?: string;
};



function FloatCart({ table }: Props) {
    const cart = useSelector((state: any) => state.cart.meals);
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [tableNo, setTableNo] = useState(table)
    const { app_settings }: any = usePage().props;

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
            table: tableNo,
            total: total,
            order: cart
        }, {
            onSuccess: () => {
                alert('✅ Order sent successfully!');
                // يمكنك تفريغ السلة إذا أردت
            },
            onError: (errors) => {
                console.log(errors);
                alert('❌ Failed to send order!');
            }
        });
    }

    return (
        <div>

            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <label htmlFor="my-drawer-4" className='fixed bottom-24 right-10 w-12 h-12 rounded-full bg-orange-600 flex justify-center items-center'>
                        <MdAddShoppingCart size={25} color="white" />
                    </label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full relative w-80 p-4">
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
                                                {app_settings ?  <p className='mx-1'>{i18n.language === 'ar' ? app_settings.currency_ar : app_settings.currency_en}</p> : ''}
                                               

                                            </div>
                                            <div className='flex mt-2 '>
                                                <button onClick={() => handleIncreaseQuantity(item.id)} className='bg-primary w-6 h-6 rounded-xl flex justify-center items-center'>
                                                    <FaPlus />
                                                </button>
                                                <input type="text" className='w-10 text-center' readOnly value={item.quantity} />
                                                <button onClick={() => handleDecreaseQuantity(item.id)} className='bg-primary w-6 h-6 rounded-xl flex justify-center items-center'>
                                                    <FiMinus />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center mr-3'>
                                            <button onClick={() => handleDeleteitem(item.id)} className='bg-red-600 w-10 h-10 flex justify-center items-center rounded-xl'><FaTrash /></button>
                                        </div>
                                    </div>
                                ))}

                                <div className='bottom-10 right-10 left-10 absolute'>
                                    <div className="text-white font-bold text-lg text-center my-4">
                                        {t('total')}: {total.toFixed(2)} AED
                                    </div>


                                    {table && table !== null ? (
                                        <form onSubmit={handle_send_order}>
                                            <button type='submit' className='btn btn-primary w-full'>{t('send-order')}</button>
                                        </form>
                                    ) : (
                                        <div>
                                            <p className='text-white text-center mb-5'>{t('out-of-table')}</p>
                                            <Link href={route('checkout.page')} className='btn btn-primary w-full'>{t('continue-checkout')}</Link>
                                        </div>

                                    )}

                                </div>

                            </>) : (<h5 className='text-white text-center'>{t('cart_empty')}</h5>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FloatCart