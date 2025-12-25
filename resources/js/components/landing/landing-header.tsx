import React from 'react'

import { useTranslation } from 'react-i18next'
import { usePage, Link } from '@inertiajs/react'
import type { PageProps as InertiaPageProps } from '@inertiajs/core'
import LanguageSelect from '@/components/ui/language-select'
import AppearanceToggle from '../appearance-toggle'
// import { DropdownMenu } from '../ui/dropdown-menu'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { MenuButton } from '@headlessui/react'


interface AuthUser {
    id: number
    name: string
    email: string
    avatar: string | null
    phone: string | null
    role: string
    created_at: string
    updated_at: string
}

interface PageProps extends InertiaPageProps {
    auth: {
        user: AuthUser | null
    }
    app_settings: {
        title_ar: string
        title_en: string
        logo: string
        app_description: string
        app_version: string
        app_url: string
        app_email: string
        app_phone: string
        app_address: string
        app_timezone: string
        app_currency: string
        app_currency_symbol: string
        app_currency_position: string
    }
}

export default function LandingHeader() {
    const { t, i18n } = useTranslation()
    // const { auth, app_settings } = usePage().props as any
    const { auth, app_settings } = usePage().props





    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <img src={app_settings?.logo} alt={app_settings?.title_en} className=" w-20 h-20 " />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {i18n.language === 'ar' ? app_settings?.title_ar : app_settings?.title_en}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">

                        <LanguageSelect />
                        <AppearanceToggle />






                        {auth && auth.user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="btn px-5 py-2 border">
                                    {t('dashboard.title')}
                                </DropdownMenuTrigger>

                                <DropdownMenuContent sideOffset={4} className="w-52">
                                    {/* اسم المستخدم */}
                                    <DropdownMenuLabel className="px-3 py-2">{auth.user.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    {/* روابط حسب الدور */}
                                    {auth.user.role === 'store_owner' && (
                                        <DropdownMenuItem asChild>
                                            <Link href={route('store.dashboard')}>{t('store.dashboard')}</Link>
                                        </DropdownMenuItem>
                                    )}
                                    {auth.user.role === 'manager' && (
                                        <DropdownMenuItem asChild>
                                            <Link href="#">{t('dashboard.title')}</Link>
                                        </DropdownMenuItem>
                                    )}
                                    {auth.user.role === 'user' && (
                                        <DropdownMenuItem asChild>
                                            <Link href="#">{t('dashboard.title')}</Link>
                                        </DropdownMenuItem>
                                    )}
                                    {auth.user.role === 'admin' && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">{t('dashboard.title')}</Link>
                                        </DropdownMenuItem>
                                    )}

                                    <DropdownMenuSeparator />

                                    {/* زر تسجيل الخروج */}
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full bg-red-600 text-white text-left"
                                        >
                                            {t('auth.logout')}
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}




                    </div>
                </div>
            </div>
        </header>
    )
}
