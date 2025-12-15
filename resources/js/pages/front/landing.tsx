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
import LanguageSelect from '@/components/ui/language-select'
import LandingHeader from '@/components/landing/landing-header'
import LandingHero from '@/components/landing/landing-hero'
import LandingFeatures from '@/components/landing/landing-features'
import LandingBenefits from '@/components/landing/landing-benefits'
import LandingAction from '@/components/landing/landing-action'
import LandingFooter from '@/components/landing/landing-footer'
import ContactFloatButtons from '@/components/landing/contact-float-buttons'

type Props = {
    categories?: { id: number; name_en: string; image: string }[]
    meals?: any[]
    table?: string
    banners?: any[]
}

export default function LandingPage({ banners }: Props) {
    const { t } = useTranslation()

    return (
        <>
            <Head title={t('digital-menu-platform')} />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Header/Navbar */}
               <LandingHeader />
                {/* Hero Section */}
               <LandingHero banners={banners} />
                {/* Features Section */}
               <LandingFeatures />
                {/* Benefits Section */}
               <LandingBenefits />
                {/* CTA Section */}
               <LandingAction />
                {/* Footer */}
               <LandingFooter />
               {/* Contact Float Buttons */}
               <ContactFloatButtons />
            </div>
        </>
    )
}
