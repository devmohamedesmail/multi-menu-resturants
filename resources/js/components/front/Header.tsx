import React from 'react'
import { FaBars } from "react-icons/fa";
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
    const { app_settings }: any = usePage().props;
    const { t, i18n } = useTranslation();
    return (
        <header className='sticky top-0 z-50 bg-black'>
            
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex items-center justify-between container mx-auto py-1 px-3">
                    <div>
                        {app_settings && app_settings.logo ? <img className='w-20 h-20' src={`/uploads/${app_settings.logo}`} alt={app_settings.title_ar} /> :''}
                        
                    </div>
                    {app_settings ?  <h6 className='text-orange-600 font-extrabold text-xl'>{i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en}</h6> : '' }
                    <LanguageSwitcher />
                    {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button bg-orange-600 outline-0 border-0 ">
                        <FaBars color='white' />
                    </label> */}
                </div>

               

                
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
                        <Link href='/' className='text-primary border-primary border-b py-2 px-1 my-2'>{t('home')}</Link>

                        <div className='absolute bottom-10 right-5 left-5'>
                            <Link href='/login' className='btn btn-primary w-full my-2'>{t('my-account')}</Link>
                            <LanguageSwitcher />
                        </div>

                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header