import React from 'react'
import { useTranslation } from 'react-i18next'
import { ShoppingCart, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import LanguageSelect from '@/components/ui/language-select'


export default function HomeHeader({ showCart, setShowCart, cartItemsCount, store }: { showCart: boolean; setShowCart: (show: boolean) => void; cartItemsCount: number; store: { name: string; image: string; address?: string } }) {
    const { t } = useTranslation()

    return (
        <header className="sticky top-0 w-full backdrop-blur-lg shadow-lg z-50 ">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo & Name */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-md opacity-50"></div>
                            <img
                                src={store.image}
                                alt={store.name}
                                className="relative w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-xl"
                            />
                        </div>
                        
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <LanguageSelect />
                        <Button
                            onClick={() => setShowCart(!showCart)}
                            className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all"
                            size="lg"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            <span className="hidden sm:inline">{t('cart')}</span>
                            {cartItemsCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold animate-bounce">
                                    {cartItemsCount}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
