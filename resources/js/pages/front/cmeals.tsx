import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux'
import { add_to_cart } from '@/reducers/cartSlice';

import { Head,usePage} from '@inertiajs/react';
import Header from '@/components/front/Header';
import { useSelector } from 'react-redux';
import MealItem from '@/components/custom/MealItem';
import CategoryItem from '@/components/custom/CategoryItem';
import FloatCart from '@/components/front/FloatCart';
import BottomNav from '@/components/front/BottomNav';






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
    category:any
};






function index({ categories, meals,table,category}: Props) {
    const { t, i18n } = useTranslation()
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const dispatch = useDispatch()
    const { app_settings }: any = usePage().props;
    const cart = useSelector((state: any) => state.cart.meals);
    const [showAddAlert, setShowAddAlert] = useState(false);



    console.log(category.meals)



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
                 // أظهر التنبيه
                 setShowAddAlert(true);

                 // أخفِ التنبيه بعد 3 ثوانٍ
                 setTimeout(() => setShowAddAlert(false), 3000);
        } catch (error) {
            console.log(error);
        }
    };

    // *************************************** Add to cart end *******************************************



    return (
        <div>
            <Head title='Home' />
            <Header />

             <h4 className='text-white text-center text-2xl font-extrabold'>{i18n.language === 'en' ? category.name_en : category.name_en}</h4>


            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 container mx-auto px-4 my-50'>
                {category.meals && category.meals.length > 0 ? (
                    <>
                   {category.meals && category.meals.map((meal: any) => (
                        <MealItem
                            key={meal.id}
                            image={`/uploads/${meal.image}`}
                            title={i18n.language === 'en' ? meal.name_en : meal.name_ar}
                            description={i18n.language === 'en' ? meal.description_en : meal.description_ar}
                            price={meal.price}
                            currency={i18n.language === 'en' ? app_settings.currency_en : app_settings.currency_ar }
                            increaseQuantity={() => handleIncrement(meal.id)}
                            decreaseQuantity={() => handleDecrement(meal.id)}
                            quantity={quantities[meal.id] || 1}
                            addCart={() => handleAddToCart(meal)}

                        />
                    ))}
                    </>
                    ) : (<></>)}
            </div>


            {showAddAlert && (
                <div className="alert alert-success shadow-lg my-4">
                    <span>✅ تمت إضافة المنتج إلى السلة</span>
                </div>
            )}

           <FloatCart table={table} />
           <BottomNav />

        </div>
    )
}

export default index