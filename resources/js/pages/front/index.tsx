import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    QrCode,
    Smartphone,
    Menu,
    TrendingUp,
    Globe,
    Zap,
    ShoppingCart,
    BarChart3,
    ChefHat,
    Languages,
    ArrowRight,
    Check,
} from 'lucide-react'
import { usePage } from '@inertiajs/react'

type Props = {
    categories?: { id: number; name_en: string; image: string }[]
    meals?: any[]
    table?: string
}

export default function LandingPage({ categories, meals, table }: Props) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const { app_settings } = usePage().props
    const { auth } = usePage().props

console.log('auth user:', auth?.user);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
    }

    const features = [
        {
            icon: QrCode,
            title: t('qr-code-ordering'),
            description: t('qr-code-ordering-desc'),
        },
        {
            icon: Smartphone,
            title: t('mobile-friendly'),
            description: t('mobile-friendly-desc'),
        },
        {
            icon: Menu,
            title: t('digital-menu'),
            description: t('digital-menu-desc'),
        },
        {
            icon: ShoppingCart,
            title: t('easy-ordering'),
            description: t('easy-ordering-desc'),
        },
        {
            icon: BarChart3,
            title: t('analytics-dashboard'),
            description: t('analytics-dashboard-desc'),
        },
        {
            icon: Globe,
            title: t('multi-language'),
            description: t('multi-language-desc'),
        },
    ]

    const benefits = [
        t('benefit-1'),
        t('benefit-2'),
        t('benefit-3'),
        t('benefit-4'),
        t('benefit-5'),
        t('benefit-6'),
    ]

    return (
        <>
            <Head title={t('digital-menu-platform')} />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Header/Navbar */}
                <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-2">
                                <ChefHat className="w-8 h-8 text-orange-500" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {t('menu-master')}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Language Selector */}
                                <Select value={i18n.language} onValueChange={changeLanguage}>
                                    <SelectTrigger className="w-[140px]">
                                        <Languages className="w-4 h-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="ar">العربية</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* <Link href={route('login')}>
                                    <Button variant="ghost">{t('login')}</Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button>{t('get-started')}</Button>
                                </Link> */}


                                {auth && auth.user ? (
                                    <div>
                                        <button className="btn" popoverTarget="popover-1" >
                                            {t('dashboard')}
                                        </button>

                                        <ul className="dropdown bg-white menu w-52 rounded-box bg-base-100 shadow-sm"
                                            popover="auto" id="popover-1" >

                                            <p>{auth?.user?.name}</p>

                                            {auth?.user?.role_id === 3 ? (<li> <Link href=''>Dashorad</Link></li>) : null}
                                            {auth?.user?.role_id === 2 ? (<li> <Link href=''>Dashorad</Link></li>) : null}
                                            <li>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="w-full text-left"
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        <Link href={route('login')}>
                                            <Button variant="ghost">{t('login')}</Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button>{t('get-started')}</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden pt-20 pb-32">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 -z-10" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className={isArabic ? 'lg:order-2' : ''}>
                                <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                    <Zap className="w-4 h-4" />
                                    {t('revolutionary-platform')}
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                    {t('transform-your-restaurant')}
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                    {t('landing-hero-description')}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href={route('register')}>
                                        <Button size="lg" className="text-lg px-8">
                                            {t('start-free-trial')}
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button size="lg" variant="outline" className="text-lg px-8">
                                            {t('login')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className={isArabic ? 'lg:order-1' : ''}>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-3xl opacity-20" />
                                    <img
                                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
                                        alt="Restaurant"
                                        className="relative rounded-2xl shadow-2xl w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {t('powerful-features')}
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {t('powerful-features-desc')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                                            <feature.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                    {t('why-choose-us')}
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                    {t('why-choose-us-desc')}
                                </p>
                                <div className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 text-lg">
                                                {benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                                    alt="Dashboard"
                                    className="rounded-2xl shadow-2xl w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            {t('ready-to-start')}
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            {t('ready-to-start-desc')}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href={route('register')}>
                                <Button size="lg" variant="secondary" className="text-lg px-8">
                                    {t('create-account')}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white/20"
                                >
                                    {t('login')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
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
            </div>
        </>
    )
}
