import { Link, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoHomeOutline } from 'react-icons/io5';
import { IoBagHandle } from 'react-icons/io5';
import { IoStar } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useSelector } from 'react-redux';


function BottomNav() {
    const { t } = useTranslation();
    const modalRef = useRef<HTMLDialogElement>(null);
    const [showToast, setShowToast] = useState(false);
    const cart = useSelector((state: any) => state.cart.meals);
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: '',
    });

    const send_feedback = (e: any) => {
        e.preventDefault();

        const ratingInput = document.querySelector<HTMLInputElement>('input[name="rating-11"]:checked');
        const rating = ratingInput?.ariaLabel?.split(' ')[0];

        setData('rating', rating ?? '');

        post(route('send.feedback'), {
            onSuccess: () => {
                reset();
                if (modalRef.current) {
                    modalRef.current.close(); // Close modal immediately after submission
                }
                setShowToast(true); // Show toast after feedback is successfully sent
                setTimeout(() => setShowToast(false), 3000);
            },
        });
    };

    const openModal = () => {
        modalRef.current?.showModal();
    };


    const total = cart.reduce((acc: number, item: any) => {
        return acc + item.price * item.quantity;
    }, 0);
    return (
        <>
            {/* Modal */}
            <dialog ref={modalRef} id="rate_modal" className="modal backdrop-blur-sm">
                <div className="modal-box bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl">
                    {/* Close button */}
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle bg-gray-700 hover:bg-red-600 border-gray-600 hover:border-red-500 absolute right-3 top-3 transition-all duration-200"
                            onClick={() => modalRef.current?.close()}
                        >
                            <IoMdClose color="white" size={16} />
                        </button>
                    </form>

                    <form onSubmit={send_feedback}>
                        <div className="flex flex-col justify-center items-center pt-4">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                                    <IoStar size={28} className="text-white" />
                                </div>
                                <h3 className="font-bold text-2xl text-white mb-2">{t('rate-us')}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                                    شكراً لك! يرجى تقييم تجربتك معنا والمساعدة في تحسين خدماتنا.
                                </p>
                            </div>

                            {/* Rating Section */}
                            <div className="mb-8">
                                <div className="rating rating-lg rating-half bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                                    <input type="radio" name="rating-11" className="rating-hidden" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="0.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="1 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="1.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="2 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="2.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="3 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="3.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="4 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="4.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-gradient-to-r from-orange-400 to-yellow-400 hover:scale-110 transition-transform" aria-label="5 star" defaultChecked />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3 min-w-32" 
                                type="submit" 
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span>جاري الإرسال...</span>
                                    </>
                                ) : (
                                    <>
                                        <IoStar size={18} />
                                        <span>{t('send')}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {showToast && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert bg-gradient-to-r from-green-600 to-emerald-600 border-green-500 shadow-2xl transform animate-bounce">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <IoStar size={16} className="text-white" />
                            </div>
                            <span className="text-white font-medium">{t('thank-feedback')} 🌟</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900/95 backdrop-blur-lg border-t border-gray-700/50 shadow-2xl block md:hidden">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                
                <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
                    {/* Home */}
                    <Link 
                        href="/" 
                        className="group flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                        <div className="relative mb-1">
                            <IoHomeOutline 
                                size={24} 
                                className="text-gray-400 group-hover:text-orange-500 transition-colors duration-300" 
                            />
                            <div className="absolute inset-0 bg-orange-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                            {t('home')}
                        </span>
                    </Link>

                    {/* Rate Us */}
                    <button 
                        onClick={openModal} 
                        className="group flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                        <div className="relative mb-1">
                            <IoStar 
                                size={24} 
                                className="text-gray-400 group-hover:text-yellow-500 transition-all duration-300 group-hover:rotate-12" 
                            />
                            <div className="absolute inset-0 bg-yellow-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                            {t('rate-us')}
                        </span>
                    </button>

                    {/* Cart */}
                    <Link 
                        href="/" 
                        className="group relative flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                        <div className="relative mb-1">
                            {/* Cart Badge */}
                            {cart && cart.length > 0 && (
                                <div className="absolute -top-2 -right-2 z-10">
                                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                                        {cart.length > 9 ? '9+' : cart.length}
                                    </span>
                                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                                </div>
                            )}
                            <IoBagHandle 
                                size={24} 
                                className="text-gray-400 group-hover:text-orange-500 transition-all duration-300 group-hover:rotate-12" 
                            />
                            <div className="absolute inset-0 bg-orange-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                            {t('cart')}
                        </span>
                        {/* Total display */}
                        {total > 0 && (
                            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-gray-700 text-orange-400 text-xs px-2 py-0.5 rounded-full font-medium border border-orange-500/30">
                                {total.toFixed(2)}
                            </span>
                        )}
                    </Link>

                    {/* Menu */}
                    <Link 
                        href={route('show.menu')} 
                        className="group flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                        <div className="relative mb-1">
                            <MdOutlineRestaurantMenu 
                                size={24} 
                                className="text-gray-400 group-hover:text-orange-500 transition-colors duration-300" 
                            />
                            <div className="absolute inset-0 bg-orange-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                            {t('food-menu')}
                        </span>
                    </Link>
                </div>

                {/* Safe area for iPhone bottom */}
                <div className="pb-safe"></div>
            </div>
        </>
    );
}

export default BottomNav;
