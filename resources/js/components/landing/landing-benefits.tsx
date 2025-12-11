import React from 'react'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function LandingBenefits() {
    const { t } = useTranslation()
    const benefits = [
        t('benefit-1'),
        t('benefit-2'),
        t('benefit-3'),
        t('benefit-4'),
        t('benefit-5'),
        t('benefit-6'),
    ]
    return (
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
    )
}
