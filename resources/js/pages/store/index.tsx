import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,
    ShoppingBag,
    TrendingUp,
    Plus,
    LogOut,
} from 'lucide-react'

export default function Dashboard() {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState('overview')

    // Mock data - replace with real data from props
    const stats = {
        totalCategories: 12,
        totalMeals: 48,
        totalOrders: 156,
        totalRevenue: '$12,450',
    }

    return (
        <>
            <Head title={t('restaurant-dashboard')} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {t('restaurant-dashboard')}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {t('my-restaurant')}
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                <LogOut className="w-4 h-4 mr-2" />
                                {t('logout')}
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        {/* Navigation Tabs */}
                        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
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
                        </TabsList>

                        {/* Overview Tab */}
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
                                        className="w-full h-20"
                                        onClick={() => setActiveTab('categories')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Plus className="w-5 h-5" />
                                            <span>{t('add-new-category')}</span>
                                        </div>
                                    </Button>
                                    <Button
                                        className="w-full h-20"
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

                        {/* Categories Tab */}
                        <TabsContent value="categories">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>{t('manage-categories')}</CardTitle>
                                            <CardDescription>
                                                Add, edit, or remove categories
                                            </CardDescription>
                                        </div>
                                        <Button>
                                            <Plus className="w-4 h-4 mr-2" />
                                            {t('add-category')}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12 text-gray-500">
                                        {t('no-categories')}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Meals Tab */}
                        <TabsContent value="meals">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>{t('manage-meals')}</CardTitle>
                                            <CardDescription>
                                                Add, edit, or remove meals
                                            </CardDescription>
                                        </div>
                                        <Button>
                                            <Plus className="w-4 h-4 mr-2" />
                                            {t('add-meal')}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12 text-gray-500">
                                        {t('no-meals')}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </>
    )
}
