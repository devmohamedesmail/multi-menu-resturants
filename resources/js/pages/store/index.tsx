import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Tabs} from '@/components/ui/tabs'
import CategoryDialog from '@/components/store/category-dialog'
import MealDialog from '@/components/store/meal-dialog'
import DashboardHeader from '@/components/store/dashboard-header'
import DashboardNavigationTabs from '@/components/store/dashboard-navigation-tabs'
import DashboardCategoriesTab from '@/components/store/dashboard-categories-tab'
import DashboardOverviewTab from '@/components/store/dashboard-overview-tab'
import DashboardMealsTab from '@/components/store/dashboard-meals-tab'
import DashboardOrdersTab from '@/components/store/dashboard-orders-tab'
import DashboardTablesTab from '@/components/store/dashboard-tables-tab'

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
    orders: any[]
    tables: any[]
}

export default function Dashboard({ store, categories = [], meals = [], stats, country, attributes = [], orders=[], tables=[] }: Props) {
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
            
              <DashboardHeader />



             
                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <DashboardNavigationTabs />
                        <DashboardOverviewTab stats={stats} setActiveTab={setActiveTab} />
                        <DashboardCategoriesTab categories={categories} setEditingCategory={setEditingCategory} setCategoryDialogOpen={setCategoryDialogOpen} handleDeleteCategory={handleDeleteCategory} />
                        <DashboardMealsTab meals = {meals} setEditingMeal={setEditingMeal} setMealDialogOpen={setMealDialogOpen} country={country} handleDeleteMeal={handleDeleteMeal} />
                        <DashboardOrdersTab orders={orders} />
                        <DashboardTablesTab store={store} tables={tables} />
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
