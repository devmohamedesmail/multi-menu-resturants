import React from 'react'
import { Zap, ArrowRight, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

interface Banners {
    id: number
    title_ar: string
    title_en: string
    description: string
    image: string
}

export default function LandingHero({ banners }: { banners?: Banners[] }) {
    const { t, i18n } = useTranslation()

    return (
        <div className="container m-auto px-4 mt-10 sm:px-6 lg:px-8">
            <div>
                {/* first section */}
                <div className='flex flex-col item-center justify-center '>
                    <div className="inline-flex items-center w-fit gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        {t('landing.revolutionary-platform')}
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight text-center">
                        {t('landing.transform-your-restaurant')}
                    </h1>

                    <p className="text-md text-gray-600 dark:text-gray-300 mb-8 text-center">
                        {t('landing.landing-hero-description')}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href={route('register.store.page')}>
                            <Button size="lg" className="text-lg px-8 bg-main hover:bg-second hover:text-white" >
                                {t('landing.start-free-trial')}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href={route('login')}>
                            <Button size="lg" variant="outline" className="text-lg px-8 hover:bg-main hover:text-white">
                                {t('landing.login')}
                            </Button>
                        </Link>
                    </div>

                    <div className='flex justify-center items-center mt-10'>
                        <Link className='bg-main text-white px-4 py-5 rounded-lg flex items-center gap-2'
                            href={`/store/home/${encodeURIComponent('menu-pro')}/3/3`}
                        >
                            {t('landing.explore-demo-restaurant')}
                            <MoveRight />
                        </Link>
                    </div>
                </div>

                {/* Banner Slider Section */}
                <div className='my-16'>
                    {banners && banners?.length > 0 ? (
                        <div className="relative group">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                speed={800}
                                loop={banners.length > 1}
                                className="rounded-2xl shadow-2xl overflow-hidden"
                            >
                                {banners.map((banner, index) => (
                                    <SwiperSlide key={banner.id || index}>
                                        <div className="relative h-[300px] md:h-[500px] lg:h-[500px] overflow-hidden">
                                            {/* Background Image with Overlay */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={`${banner.image}`}
                                                    alt={i18n.language === 'ar' ? banner.title_ar : banner.title_en}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/assets/banner.png';
                                                    }}
                                                />
                                                {/* Gradient Overlay for better text readability */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
                                            </div>

                                            {/* Content Overlay */}
                                            <div className="relative h-full flex items-end">
                                                <div className="container mx-auto px-6 md:px-12 pb-12 md:pb-16">
                                                    <div className="max-w-3xl">
                                                        {/* Title with Animation */}
                                                        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in-up ${i18n.language === 'ar' ? 'text-right' : 'text-left'
                                                            }`}>
                                                            {i18n.language === 'ar' ? banner.title_ar : banner.title_en}
                                                        </h2>

                                                        {/* Decorative Line */}
                                                        <div className="w-24 h-1 bg-orange-500 mb-6 rounded-full"></div>

                                                        {/* Badge */}
                                                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                                                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                                                            {t('banner.explore-menu')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decorative Elements */}
                                            <div className="absolute top-8 right-8 w-20 h-20 border-4 border-orange-500/30 rounded-full animate-pulse"></div>
                                            <div className="absolute bottom-20 left-8 w-16 h-16 border-4 border-white/20 rounded-full"></div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Navigation Buttons */}
                            <button
                                className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    ) : (
                        /* Fallback Image */
                        <div className="relative rounded-2xl shadow-2xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
                            <img
                                src="/assets/banner.png"
                                alt="Restaurant"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
