import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Banner() {
    const { t, i18n } = useTranslation();
    return (
        <div className="container m-auto px-5 my-10">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 shadow-2xl border border-gray-700">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/20"></div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-500/10 rounded-full blur-xl"></div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className={`text-center md:text-left ${i18n.language === 'ar' ? 'md:text-right' : ''}`}>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {t('banner.welcome-to-our-restaurant')} <br />
                                <span className="text-orange-400">{t('banner.delicious-menu')}</span>
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-md">
                                {t('banner.discover-fresh-ingredients')}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm">{t('banner.fresh-daily')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">{t('banner.fast-service')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Food illustration/image */}
                        <div className="relative">
                            <div className="w-48 h-48 md:w-64 md:h-64 relative">
                                {/* Decorative circles */}
                                <div className="absolute inset-0 bg-gray-700/30 rounded-full animate-pulse"></div>
                                <div className="absolute inset-4 bg-gray-600/40 rounded-full"></div>

                                {/* Food image */}
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-800/50 backdrop-blur-sm">
                                        <img
                                            src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                            alt="Delicious Food"
                                            className="w-full h-full object-cover rounded-full"
                                            onError={(e) => {
                                                // Fallback to a different image if the first one fails
                                                e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                                            }}
                                        />
                                        {/* Overlay for better text contrast */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full animate-bounce delay-100 shadow-lg"></div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-500 rounded-full animate-bounce delay-300 shadow-lg"></div>
                            <div className="absolute top-1/2 -left-4 w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-500 shadow-lg"></div>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className={`mt-8 text-center ${i18n.language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                        <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg border border-orange-500">
                            {t('banner.explore-menu')} →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
