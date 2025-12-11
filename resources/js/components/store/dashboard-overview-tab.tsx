import React from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    FolderOpen,
    UtensilsCrossed,
    ShoppingBag,
    TrendingUp,
    Plus,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function DashboardOverviewTab({ stats, setActiveTab }: any) {
    const { t } = useTranslation()
    return (
        <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t('total-categories')}
                        </CardTitle>
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCategories}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +2 {t('from')} last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t('total-meals')}
                        </CardTitle>
                        <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalMeals}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +8 {t('from')} last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t('total-orders')}
                        </CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +12% {t('from')} last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {t('total-revenue')}
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalRevenue}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +18% {t('from')} last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('quick-actions')}</CardTitle>
                    <CardDescription>
                        Manage your restaurant content
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <Button
                        className="w-full h-20 bg-main hover:bg-second"
                        onClick={() => setActiveTab('categories')}
                    >
                        <div className="flex items-center gap-3">
                            <Plus className="w-5 h-5" />
                            <span>{t('add-new-category')}</span>
                        </div>
                    </Button>
                    <Button
                        className="w-full h-20 bg-main hover:bg-second"
                        onClick={() => setActiveTab('meals')}
                    >
                        <div className="flex items-center gap-3">
                            <Plus className="w-5 h-5" />
                            <span>{t('add-new-meal')}</span>
                        </div>
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
