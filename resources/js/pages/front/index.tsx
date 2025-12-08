import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { add_to_cart } from '@/reducers/cartSlice';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/front/Header';
import MealItem from '@/components/custom/MealItem';
import CategoryItem from '@/components/custom/CategoryItem';
import FloatCart from '@/components/front/FloatCart';
import BottomNav from '@/components/front/BottomNav';
import Banner from '@/components/banner';







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
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const dispatch = useDispatch()
    const { app_settings }: any = usePage().props;
     const [showToast, setShowToast] = useState(false);
    // *************************************** Quantity Increment start *******************************************
    const handleIncrement = (id: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1,
        }));
    };

    // *************************************** Quantity Increment end *******************************************


    // *************************************** Quantity Decrement start *******************************************
    const handleDecrement = (id: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1,
        }));
    };

    // *************************************** Quantity Decrement end *******************************************



    // *************************************** Add to cart start *******************************************
    const handleAddToCart = (meal: MealType) => {

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

    // *************************************** Add to cart end *******************************************



    return (
        <div>
            <Head title='Home' />
            <Header />


            <div className='container m-auto px-5'>
                <div className='flex justify-between items-center my-10'>
                    <h6 className={`text-white block  w-full font-bold ${i18n.language === 'ar' ? 'text-right' : ''} `}>{t('categories')}</h6>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">

                    {categories && categories.map((category: any) => (
                        <CategoryItem
                            key={category.id}
                            link={`/category/meals/${category.id}`}
                            image={`/uploads/${category.image}`}
                            title={i18n.language === 'en' ? category.name_en : category.name_ar} />
                    ))}
                </div>
            </div>

        <Banner />

            {/* meals section */}
            <div className='container m-auto px-5 mb-20'>
                <div className='flex justify-between items-center my-10'>
                    <h6 className={`text-white block  w-full font-bold ${i18n.language === 'ar' ? 'text-right' : ''} `}>{t('meals')}</h6>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {meals && meals.map((meal: any) => (
                        <MealItem
                            key={meal.id}
                            image={`/uploads/${meal.image}`}
                            title={i18n.language === 'en' ? meal.name_en : meal.name_ar}
                            description={i18n.language === 'en' ? meal.description_en : meal.description_ar}
                            price={meal.price}
                            currency={i18n.language === 'en' ? app_settings.currency_en : app_settings.currency_ar}
                            increaseQuantity={() => handleIncrement(meal.id)}
                            decreaseQuantity={() => handleDecrement(meal.id)}
                            quantity={quantities[meal.id] || 1}
                            addCart={() => handleAddToCart(meal)}

                        />
                    ))}
                </div>
            </div>

            {showToast && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-success bg-primary px-10">
                        <span className='text-white'>{t('added-to-cart')}</span>
                    </div>
                </div>
            )}

            <FloatCart table={table} />

            <BottomNav />

        </div>
    )
}

export default index