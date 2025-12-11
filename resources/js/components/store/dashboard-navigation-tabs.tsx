import React from 'react'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,

} from 'lucide-react'
import { useTranslation } from 'react-i18next'
export default function DashboardNavigationTabs() {
    const { t } = useTranslation()
    return (
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">{t('dashboard')}</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{t('categories')}</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                <span className="hidden sm:inline">{t('meals')}</span>
            </TabsTrigger>

            <TabsTrigger value="orders" className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                <span className="hidden sm:inline">{t('orders')}</span>
            </TabsTrigger>
        </TabsList>
    )
}
