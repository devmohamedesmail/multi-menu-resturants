import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Minus, ChefHat, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function NoMealsFound() {
    const { t } = useTranslation()
    return (
        <Card>
            <CardContent className="p-12 text-center">
                <ChefHat className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('no-meals-found')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    {t('try-different-search')}
                </p>
            </CardContent>
        </Card>
    )
}
