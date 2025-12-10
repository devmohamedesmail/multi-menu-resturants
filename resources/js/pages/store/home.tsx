import React, { useState, useEffect } from 'react'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
    ShoppingCart,
    Plus,
    Minus,
    X
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_cart, remove_from_cart, increase_quantity, decrease_quantity, reset_cart } from '@/reducers/cartSlice'

import HomeHeader from '@/components/store/home-header'
import HomeHero from '@/components/store/home-hero'
import HomeCategories from '@/components/store/home-categories'
import HomeMeals from '@/components/store/home-meals'
import HomeSearch from '@/components/store/home-search'
import FloatCart from '@/components/front/FloatCart'
import BottomNav from '@/components/front/BottomNav'

interface Category {
    id: number
    name_en: string
    name_ar: string
    image: string
    meals_count: number
}

interface Meal {
    id: number
    name_en: string
    name_ar: string
    description_en?: string
    description_ar?: string
    image: string
    price: number
    sale_price?: number
    category: {
        id: number
        name_en: string
        name_ar: string
    }
}

interface Country {
    id: number
    name_en: string
    name_ar: string
    currency_en: string
    currency_ar: string
}

interface Store {
    id: number
    name: string
    email?: string
    phone?: string
    address?: string
    image: string
    banner?: string
    description?: string
    country: Country
    categories: Category[]
    meals: Meal[]
}

interface CartItem extends Meal {
    quantity: number
}

interface Props {
    store: Store
    table?: string
}

export default function Home({ store, table }: Props) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cart.meals || [])
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [showCart, setShowCart] = useState(false)
    const categories = store.categories || []
    const meals = store.meals || []

    // Filter meals
    const filteredMeals = meals.filter(meal => {
        const matchesSearch =
            meal.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meal.name_ar.includes(searchTerm) ||
            (meal.description_en?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (meal.description_ar?.includes(searchTerm))

        const matchesCategory = selectedCategory === null || meal.category.id === selectedCategory

        return matchesSearch && matchesCategory
    })

    // Cart functions using Redux
    const addToCart = (meal: Meal) => {
        dispatch(add_to_cart({ ...meal, quantity: 1 }))
    }

    const removeFromCartHandler = (mealId: number) => {
        dispatch(remove_from_cart(mealId))
    }

    const updateQuantity = (mealId: number, newQuantity: number) => {
        const currentItem = cart.find((item: CartItem) => item.id === mealId)
        if (!currentItem) return

        if (newQuantity > currentItem.quantity) {
            // Increase quantity
            dispatch(increase_quantity(mealId))
        } else if (newQuantity < currentItem.quantity) {
            // Decrease quantity
            dispatch(decrease_quantity(mealId))
        }
    }

    const getItemPrice = (item: Meal) => item.sale_price || item.price
    const cartTotal = cart.reduce((sum: number, item: CartItem) => sum + (getItemPrice(item) * item.quantity), 0)
    const cartItemsCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
    const currency = isArabic ? store.country?.currency_ar : store.country?.currency_en



    return (
        <>
            <Head title={store.name} />

            <div className="min-h-screen bg-gradient-to-b from-black via-black/90 to-black">
                {/* Floating Header */}
                <HomeHeader showCart={showCart} setShowCart={setShowCart} cartItemsCount={cartItemsCount} store={store} />



                <HomeHero 
                  store={store} 
                  table={table}
                  />

                <div className="container mx-auto px-4 pb-12">

                    <HomeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


                    <HomeCategories 
                     selectedCategory={selectedCategory} 
                     setSelectedCategory={setSelectedCategory} 
                     categories={categories} 
                     meals={meals} />

                    {/* Meals Grid */}


                    <HomeMeals
                        filteredMeals={filteredMeals}
                        selectedCategory={selectedCategory}
                        categories={categories}
                        cart={cart}
                        updateQuantity={updateQuantity}
                        getItemPrice={getItemPrice}
                        addToCart={addToCart}
                        removeFromCart={removeFromCartHandler}
                        showCart={showCart}
                        setShowCart={setShowCart}
                        currency={currency}


                    />
                </div>

                {/* Cart Sidebar */}
                {showCart && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setShowCart(false)}
                        />
                        <div className={`fixed top-0 ${isArabic ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-${isArabic ? 'left' : 'right'}`}>
                            {/* Cart Header */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <ShoppingCart className="w-6 h-6 text-orange-500" />
                                        {t('your-cart')}
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setShowCart(false)}
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {cartItemsCount} {t('items')}
                                </p>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {t('cart-empty')}
                                        </p>
                                    </div>
                                ) : (
                                    cart.map((item: CartItem) => {
                                        const price = getItemPrice(item)
                                        const itemTotal = price * item.quantity

                                        return (
                                            <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow">
                                                <img
                                                    src={item.image}
                                                    alt={isArabic ? item.name_ar : item.name_en}
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                                        {isArabic ? item.name_ar : item.name_en}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {price} {currency}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-2 bg-white dark:bg-gray-600 rounded-lg p-1">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="h-7 w-7 p-0"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </Button>
                                                            <span className="font-bold px-2 min-w-[2rem] text-center text-sm">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="h-7 w-7 p-0"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => removeFromCartHandler(item.id)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="text-sm font-semibold text-orange-500 mt-1">
                                                        {t('subtotal')}: {itemTotal.toFixed(2)} {currency}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>

                            {/* Cart Footer */}
                            {cart.length > 0 && (
                                <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
                                    <div className="flex items-center justify-between text-xl font-bold">
                                        <span>{t('total')}</span>
                                        <span className="text-orange-500">
                                            {cartTotal.toFixed(2)} {currency}
                                        </span>
                                    </div>
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        {t('checkout')}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => dispatch(reset_cart())}
                                    >
                                        {t('clear-cart')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>




            <FloatCart />
            {/* <BottomNav /> */}
        </>
    )
}
