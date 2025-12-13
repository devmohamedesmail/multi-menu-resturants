import React from 'react'
import { Zap, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {  Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

export default function LandingHero() {
    const { t } = useTranslation()
    return (


        <div className="container m-auto px-4 mt-10 sm:px-6 lg:px-8">
            <div>
                {/* first section */}
                <div className='flex flex-col item-center justify-center '>
                    <div className="inline-flex items-center w-fit gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        {t('landing.revolutionary-platform')}
                    </div>

                    <h1 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight text-center">
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
                </div>
                {/* second section */}
                <div className='my-10'>
                     <img
                        src="/assets/banner.png"
                        alt="Restaurant"
                        className="relative rounded-2xl shadow-2xl w-full h-fit object-cover"
                    />

                </div>
            </div>

        </div>



    )
}
