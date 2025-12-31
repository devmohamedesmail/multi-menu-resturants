
import { useTranslation } from 'react-i18next'
import { Head } from '@inertiajs/react'
import LandingHeader from '@/components/landing/landing-header'
import LandingHero from '@/components/landing/landing-hero'
import LandingFeatures from '@/components/landing/landing-features'
import LandingBenefits from '@/components/landing/landing-benefits'
import LandingAction from '@/components/landing/landing-action'
import LandingFooter from '@/components/landing/landing-footer'
import ContactFloatButtons from '@/components/landing/contact-float-buttons'


type Banner = {
    id: number
    image: string
    title_ar: string
    title_en: string
    description: string
}

type Props = {
    banners?: Banner[]
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
