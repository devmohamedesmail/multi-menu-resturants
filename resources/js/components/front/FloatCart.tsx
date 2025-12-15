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
import CartItem from '../store/cart-item';


type Props = {
    table?: string;
};



function FloatCart({ table }: Props) {
    const cart = useSelector((state: any) => state.cart.meals);
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [tableNo, setTableNo] = useState(table)
    const { app_settings }: any = usePage().props;


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
                                    <CartItem key={item.id} item={item} />
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

                            </>) : (<h5 className='text-white text-center'>{t('menu.cart-empty')}</h5>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FloatCart