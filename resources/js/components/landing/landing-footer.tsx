import React from 'react'
import { ChefHat } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, usePage } from '@inertiajs/react'

export default function LandingFooter() {
    const { t, i18n } = useTranslation();
    const { app_settings }: any = usePage().props;
    console.log(app_settings);
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            {/* <ChefHat className="w-6 h-6 text-orange-500" /> */}
                            <img src={app_settings.logo} alt={app_settings.name} className="w-24 h-24" />
                            <span className="text-lg font-bold">
                               
                                {i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en}
                                
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            {i18n.language === 'ar' ? app_settings.description_ar : app_settings.description_en}
                        </p>
                    </div>


                    <div>
                        <h3 className="font-semibold mb-4">{t('quick-links')}</h3>
                        <div className="space-y-2">
                            <Link href={route('register.store.page')} className="block text-gray-400 hover:text-white">
                                {t('landing.get-started')}
                            </Link>
                            <Link href={route('login')} className="block text-gray-400 hover:text-white">
                                {t('landing.login')}
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">{t('landing.contact')}</h3>
                        <p className="text-gray-400">{t('landing.contact-description')}</p>
                        <div>
                            <p className="text-gray-400 mt-2 border-b pb-2 border-gray-200">{t('common.email')} {app_settings.email}</p>
                            <p className="text-gray-400 border-b pb-2 border-gray-200">{t('common.phone')} {app_settings.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>© 2025 {app_settings.title_en}. {t('landing.all-rights-reserved')}</p>
                </div>
            </div>
        </footer>
    )
}
