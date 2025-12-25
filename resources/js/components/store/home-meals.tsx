
import { useTranslation } from 'react-i18next'
import NoMealsFound from './no-meals-found'
import HomeMealCard from './home-meal-card'


export default function HomeMeals({ filteredMeals, selectedCategory, categories,  currency }: any) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'

    return (
        <div className='pb-20'>
            {filteredMeals.length === 0 ? (
                <NoMealsFound />
            ) : (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">
                            {selectedCategory === null
                                ? t('store.all_meals')
                                : isArabic
                                    ? categories.find((c: any) => c.id === selectedCategory)?.name_ar
                                    : categories.find((c: any) => c.id === selectedCategory)?.name_en
                            }
                        </h3>
                        <span className="text-white font-medium">
                            {filteredMeals.length} {t('store.items')}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2">
                        {filteredMeals.map((meal: any) => (
                            <HomeMealCard key={meal.id} meal={meal} currency={currency} />
                        ))}

                    </div>
                </div>
            )}
        </div>
    )
}
