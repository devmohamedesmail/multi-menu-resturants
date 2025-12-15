import React from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Utensils } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomeCategories({ selectedCategory, setSelectedCategory, categories, meals }: { selectedCategory: number | null, setSelectedCategory: (id: number | null) => void, categories: any[], meals: any[] }) {

    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
                {t('store.explore-categories')}
            </h2>

            <div className="relative px-4">
                <button className="prev-btn absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-orange-100">
                    <ChevronLeft className="w-6 h-6 text-orange-600" />
                </button>

                <button className="next-btn absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:bg-orange-100">
                    <ChevronRight className="w-6 h-6 text-orange-600" />
                </button>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={2}
                    navigation={{
                        nextEl: '.next-btn',
                        prevEl: '.prev-btn',
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 8,
                            spaceBetween: 24,
                        },
                    }}
                    className="categories-swiper"
                >
                    {/* All Categories Slide */}
                    <SwiperSlide>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all w-full ${selectedCategory === null
                                ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl scale-105'
                                : 'bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-105'
                                }`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${selectedCategory === null ? 'bg-white/20' : 'bg-orange-100 dark:bg-orange-900'}`}>
                                <Utensils className={`w-8 h-8 ${selectedCategory === null ? 'text-white' : 'text-orange-500'}`} />
                            </div>
                            <span className="font-bold text-center text-sm">{t('menu.all')}</span>
                            <Badge className={selectedCategory === null ? 'bg-white text-orange-500' : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'}>
                                {meals.length}
                            </Badge>
                        </button>
                    </SwiperSlide>

                    {/* Category Slides */}
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <button
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all w-full ${selectedCategory === category.id
                                    ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl scale-105'
                                    : 'bg-white hover:shadow-lg hover:scale-105'
                                    }`}
                            >
                                <img
                                    src={category.image}
                                    alt={isArabic ? category.name_ar : category.name_en}
                                    className="w-40 h-40 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
                                />
                                <span className="font-bold text-center text-sm line-clamp-2">
                                    {isArabic ? category.name_ar : category.name_en}
                                </span>
                                <Badge className={selectedCategory === category.id ? 'bg-white text-orange-500' : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'}>
                                    {category.meals_count}
                                </Badge>
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
