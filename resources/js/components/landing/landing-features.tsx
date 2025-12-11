import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
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
} from 'lucide-react'

export default function LandingFeatures() {
    const { t } = useTranslation();

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
  return (
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
  )
}
