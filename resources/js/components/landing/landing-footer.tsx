import React from 'react'
import { ChefHat } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react'

export default function LandingFooter() {
    const { t } = useTranslation();
  return (
     <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <ChefHat className="w-6 h-6 text-orange-500" />
                                    <span className="text-lg font-bold">{t('menu-master')}</span>
                                </div>
                                <p className="text-gray-400">{t('footer-description')}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">{t('quick-links')}</h3>
                                <div className="space-y-2">
                                    <Link href={route('register')} className="block text-gray-400 hover:text-white">
                                        {t('get-started')}
                                    </Link>
                                    <Link href={route('login')} className="block text-gray-400 hover:text-white">
                                        {t('login')}
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">{t('contact')}</h3>
                                <p className="text-gray-400">{t('contact-description')}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                            <p>© 2025 {t('menu-master')}. {t('all-rights-reserved')}</p>
                        </div>
                    </div>
                </footer>
  )
}
