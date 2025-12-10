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
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder={t('store.search-meals')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-14 pr-6 py-6 text-lg rounded-full text-white shadow-lg border-2 border-orange-500 focus:border-orange-600 "
                    />
                </div>
            </div>
        </div>
    )
}
