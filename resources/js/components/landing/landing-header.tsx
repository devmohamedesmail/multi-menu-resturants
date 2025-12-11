import React from 'react'
import { ChefHat } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePage, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import LanguageSelect from '@/components/ui/language-select'

export default function LandingHeader() {
    const { t, i18n } = useTranslation()
    const { auth, app_settings } = usePage().props as any
  return (
     <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-2">
                                <ChefHat className="w-8 h-8 text-orange-500" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {i18n.language === 'ar' ?  app_settings?.title_ar : app_settings?.title_en}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                         
                               <LanguageSelect />

                               


                                {auth && auth.user ? (
                                    <div>
                                        <button className="btn" popoverTarget="popover-1" >
                                            {t('dashboard')}
                                        </button>

                                        <ul className="dropdown  menu w-52 rounded-box dark:bg-black bg-white shadow-sm"
                                            popover="auto" id="popover-1" >

                                            <p className='px-3 py-2'>{auth?.user?.name}</p>
                                        

                                            {auth?.user?.role === 'store_owner' ? (<li> <Link href={route('store.dashboard')}>{t('store.dashboard')}</Link></li>) : null}
                                            {auth?.user?.role === 'manager' ? (<li> <Link href=''>Dashorad</Link></li>) : null}
                                            {auth?.user?.role === 'user' ? (<li> <Link href=''>Dashorad</Link></li>) : null}
                                            {auth?.user?.role === 'admin' ? (<li> <Link href='/dashboard'>{t('dashboard')}</Link></li>) : null}
                                            <li>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="w-full text-left"
                                                >
                                                    {t('logout')}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        {/* <Link href={route('login')}>
                                            <Button className='bg-main hover:bg-second ' variant="ghost">{t('login')}</Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button variant="ghost" className='bg-second hover:bg-main'>{t('get-started')}</Button>
                                        </Link> */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
  )
}
