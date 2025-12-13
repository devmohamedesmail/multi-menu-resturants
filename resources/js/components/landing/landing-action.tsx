import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

export default function LandingAction() {
    const { t } = useTranslation()
    return (
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                    {t('landing.ready-to-start')}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    {t('landing.ready-to-start-desc')}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href={route('register.store.page')}>
                        <Button size="lg" variant="secondary" className="text-lg px-8">
                            {t('landing.start-free-trial')}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                    <Link href={route('login')}>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white/20"
                        >
                            {t('landing.login')}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
