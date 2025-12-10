import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CategoryDialog from '@/components/store/category-dialog'
import MealDialog from '@/components/store/meal-dialog'
import {
    LayoutDashboard,
    UtensilsCrossed,
    FolderOpen,
    ShoppingBag,
    TrendingUp,
    Plus,
    LogOut,
    Edit,
    Trash2,
} from 'lucide-react'

interface Category {
    id: number
    name_en: string
    name_ar: string
    image: string
    position: number
    meals_count?: number
}

interface AttributeValue {
    id: number
    value_en: string
    value_ar: string
    price_modifier: number
    sort_order: number
}

interface Attribute {
    id: number
    name_en: string
    name_ar: string
    type: 'select' | 'radio' | 'checkbox'
    is_required: boolean
    sort_order: number
    values: AttributeValue[]
}

interface Meal {
    id: number
    name_en: string
    name_ar: string
    description_en?: string
    description_ar?: string
    image: string
    price: number
    sale_price?: number
    category: {
        id: number
        name_en: string
        name_ar: string
    }
}

interface Props {
    store: any
    categories: Category[]
    meals: Meal[]
    stats: {
        totalCategories: number
        totalMeals: number
        totalOrders: number
        totalRevenue: number
    }
    country: any
    attributes?: Attribute[]
}

export default function Dashboard({ store, categories = [], meals = [], stats, country, attributes = [] }: Props) {
    const { t, i18n } = useTranslation()
    const [activeTab, setActiveTab] = useState('overview')
    const isArabic = i18n.language === 'ar'
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
    const [mealDialogOpen, setMealDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | undefined>()
    const [editingMeal, setEditingMeal] = useState<Meal | undefined>()

    const handleDeleteCategory = (id: number) => {
        if (confirm(t('confirm-delete-category'))) {
            router.delete(route('store.category.delete', id))
        }
    }

    const handleDeleteMeal = (id: number) => {
        if (confirm(t('confirm-delete-meal'))) {
            router.delete(route('store.meal.delete', id))
        }
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
                                {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                   
                                    {store.name}
                                </p> */}
                            </div>
                            <div>

                                <h3 className='text-primary'>
                                    {store?.name}
                                </h3>
                            </div>
                           
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-sm flex items-center"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                {t('logout')}
                            </Link>
                        </div>
                    </div>
                </header>



                <Link href={route('store.home', { store: store?.id, table: 1 })}>home </Link>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        {/* Navigation Tabs */}
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
                                                {t('manage-categories-desc')}
                                            </CardDescription>
                                        </div>
                                        <Button onClick={() => {
                                            setEditingCategory(undefined)
                                            setCategoryDialogOpen(true)
                                        }}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            {t('add-category')}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {categories.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">
                                            {t('no-categories')}
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {categories.map((category) => (
                                                <Card key={category.id}>
                                                    <CardContent className="p-4">
                                                        <div className="flex gap-3">
                                                            <img
                                                                src={category.image}
                                                                alt={isArabic ? category.name_ar : category.name_en}
                                                                className="w-20 h-20 object-cover rounded-lg"
                                                            />
                                                            <div className="flex-1">
                                                                <h3 className="font-semibold text-lg">
                                                                    {isArabic ? category.name_ar : category.name_en}
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    {category.meals_count || 0} {t('meals')}
                                                                </p>
                                                                <div className="flex gap-2 mt-3">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() => {
                                                                            setEditingCategory(category)
                                                                            setCategoryDialogOpen(true)
                                                                        }}
                                                                    >
                                                                        <Edit className="w-3 h-3" />
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="destructive"
                                                                        onClick={() => handleDeleteCategory(category.id)}
                                                                    >
                                                                        <Trash2 className="w-3 h-3" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
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
                                                {t('manage-meals-desc')}
                                            </CardDescription>
                                        </div>
                                        <Button onClick={() => {
                                            setEditingMeal(undefined)
                                            setMealDialogOpen(true)
                                        }}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            {t('add-meal')}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {meals.length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">
                                            {t('no-meals')}
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {meals.map((meal) => (
                                                <Card key={meal.id}>
                                                    <CardContent className="p-4">
                                                        <img
                                                            src={meal.image}
                                                            alt={isArabic ? meal.name_ar : meal.name_en}
                                                            className="w-full h-40 object-cover rounded-lg mb-3"
                                                        />
                                                        <h3 className="font-semibold text-lg">
                                                            {isArabic ? meal.name_ar : meal.name_en}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {isArabic ? meal.category.name_ar : meal.category.name_en}
                                                        </p>
                                                        <div className="flex items-center justify-between mt-3">
                                                            <div>
                                                                {meal.sale_price ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-lg font-bold text-green-600">
                                                                            {i18n.language === 'ar' ? country.currency_ar : country.currency_en} {meal.sale_price}
                                                                        </span>
                                                                        <span className="text-sm text-gray-400 line-through">
                                                                            {i18n.language === 'ar' ? country.currency_ar : country.currency_en} {meal.price}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-lg font-bold">
                                                                        {i18n.language === 'ar' ? country.currency_ar : country.currency_en} {meal.price}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setEditingMeal(meal)
                                                                        setMealDialogOpen(true)
                                                                    }}
                                                                >
                                                                    <Edit className="w-3 h-3" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={() => handleDeleteMeal(meal.id)}
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="orders">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>{t('manage-meals')}</CardTitle>
                                            <CardDescription>
                                                {t('manage-meals-desc')}
                                            </CardDescription>
                                        </div>
                                        <Button onClick={() => {
                                            setEditingMeal(undefined)
                                            setMealDialogOpen(true)
                                        }}>
                                            <Plus className="w-4 h-4 mr-2" />
                                            {t('add-meal')}
                                        </Button>
                                    </div>
                                </CardHeader>

                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>

            {/* Dialogs */}
            <CategoryDialog
                open={categoryDialogOpen}
                onClose={() => {
                    setCategoryDialogOpen(false)
                    setEditingCategory(undefined)
                }}
                category={editingCategory}
            />

            <MealDialog
                open={mealDialogOpen}
                onClose={() => {
                    setMealDialogOpen(false)
                    setEditingMeal(undefined)
                }}
                categories={categories}
                attributes={attributes}
                meal={editingMeal}
            />
        </>
    )
}
