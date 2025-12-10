import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { Plus, Minus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_cart, remove_from_cart, increase_quantity, decrease_quantity, reset_cart } from '@/reducers/cartSlice'









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

interface CartItem extends Meal {
    quantity: number
}


export default function HomeMealCard({ meal , currency}: any) {
    const {t , i18n}=useTranslation()
    const isArabic = i18n.language === 'ar'
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cart.meals || [])



    const inCart = cart.find((item: any) => item.id === meal.id)
    const getItemPrice = (meal: any) => {
        return meal.sale_price ? meal.sale_price : meal.price
    }

    const price = getItemPrice(meal)



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
    return (
        <Card key={meal.id} className="overflow-hidden  p-0 hover:shadow-2xl transition-all duration-300 group  ">
            <div className="relative h-56 overflow-hidden  p-0">
                <img
                    src={meal.image}
                    alt={isArabic ? meal.name_ar : meal.name_en}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {meal.sale_price && (
                    <div className="absolute top-3 right-3">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {t('sale')}
                        </div>
                    </div>
                )}
                {inCart && (
                    <div className="absolute top-3 left-3">
                        <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                            {inCart.quantity}
                        </div>
                    </div>
                )}
            </div>
            <CardContent className="px-5 pb-3 ">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                        {isArabic ? meal.name_ar : meal.name_en}
                    </h3>
                    <p className="text-xs text-orange-500 font-medium mb-2">
                        {isArabic ? meal.category.name_ar : meal.category.name_en}
                    </p>
                    {(isArabic ? meal.description_ar : meal.description_en) && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {isArabic ? meal.description_ar : meal.description_en}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <div>
                        {meal.sale_price ? (
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                    {price} {currency}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    {meal.price} {currency}
                                </span>
                            </div>
                        ) : (
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {price} {currency}
                            </span>
                        )}
                    </div>

                    {inCart ? (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-xl p-1.5">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateQuantity(meal.id, inCart.quantity - 1)}
                                className="h-9 w-9 p-0 hover:bg-white dark:hover:bg-gray-700"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-bold px-3 min-w-[2.5rem] text-center text-lg">
                                {inCart.quantity}
                            </span>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateQuantity(meal.id, inCart.quantity + 1)}
                                className="h-9 w-9 p-0 hover:bg-white dark:hover:bg-gray-700"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => addToCart(meal)}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg transition-all"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            {t('add-to-cart')}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
