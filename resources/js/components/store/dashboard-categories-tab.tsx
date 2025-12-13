
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function DashboardCategoriesTab({ categories, setEditingCategory, setCategoryDialogOpen, handleDeleteCategory }: any) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    return (
        <TabsContent value="categories">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{t('dashboard.manage-categories')}</CardTitle>
                            <CardDescription className='mt-5'>
                                {t('dashboard.manage-categories-desc')}
                            </CardDescription>
                        </div>
                        <Button
                            className='bg-main hover:bg-second'
                            onClick={() => {
                                setEditingCategory(undefined)
                                setCategoryDialogOpen(true)
                            }}>
                            <Plus className="w-4 h-4 mr-2" />
                            {t('dashboard.add-new-category')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {categories.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            {t('dashboard.no-categories')}
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category: any) => (
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
    )
}
