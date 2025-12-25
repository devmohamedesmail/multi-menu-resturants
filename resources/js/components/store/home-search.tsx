import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function HomeSearch({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (term: string) => void }) {
    const { t } = useTranslation()


    return (
        <div className="mb-8">
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    {/* Icon */}
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
                    
                    {/* Input */}
                    <Input
                        placeholder={t('store.search-meals')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="
                            pl-14 pr-6 py-4 text-lg rounded-full
                            text-gray-900 dark:text-gray-100
                            bg-white dark:bg-gray-900
                            border border-orange-500
                            focus:border-orange-600
                            shadow-sm dark:shadow-sm
                            placeholder-gray-400 dark:placeholder-gray-300
                        "
                    />
                </div>
            </div>
        </div>
    )
}
