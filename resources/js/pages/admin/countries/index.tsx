import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

interface Country {
    id: number
    name_en: string
    name_ar: string
    currency_en: string
    currency_ar: string
    code: string
    created_at: string
}

interface Props {
    countries: Country[]
}

export default function CountriesPage({ countries }: Props) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const [searchTerm, setSearchTerm] = useState('')
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        name_en: '',
        name_ar: '',
        currency_en: '',
        currency_ar: '',
        code: '',
    })

    const filteredCountries = countries.filter((country) =>
        country.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name_ar.includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.post(route('country.store'), formData, {
            onSuccess: () => {
                setFormData({
                    name_en: '',
                    name_ar: '',
                    currency_en: '',
                    currency_ar: '',
                    code: '',
                })
                setShowAddForm(false)
            },
        })
    }

    const handleDelete = (id: number) => {
        if (confirm(t('confirm-delete-country'))) {
            router.get(route('country.delete', id))
        }
    }

    return (
        <AppLayout>
            <Head title={t('countries')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('countries')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('manage-countries-desc')}
                        </p>
                    </div>
                    <Button onClick={() => setShowAddForm(!showAddForm)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {t('add-country')}
                    </Button>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('add-new-country')}</CardTitle>
                            <CardDescription>{t('fill-country-details')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name_en">{t('country-name-en')}</Label>
                                        <Input
                                            id="name_en"
                                            value={formData.name_en}
                                            onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                                            placeholder={t('enter-country-name-en')}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="name_ar">{t('country-name-ar')}</Label>
                                        <Input
                                            id="name_ar"
                                            value={formData.name_ar}
                                            onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                                            placeholder={t('enter-country-name-ar')}
                                            dir="rtl"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="currency_en">{t('currency-en')}</Label>
                                        <Input
                                            id="currency_en"
                                            value={formData.currency_en}
                                            onChange={(e) => setFormData({ ...formData, currency_en: e.target.value })}
                                            placeholder={t('enter-currency-en')}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="currency_ar">{t('currency-ar')}</Label>
                                        <Input
                                            id="currency_ar"
                                            value={formData.currency_ar}
                                            onChange={(e) => setFormData({ ...formData, currency_ar: e.target.value })}
                                            placeholder={t('enter-currency-ar')}
                                            dir="rtl"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="code">{t('country-code')}</Label>
                                        <Input
                                            id="code"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                            placeholder={t('enter-country-code')}
                                            maxLength={10}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAddForm(false)}
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button type="submit">{t('create')}</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder={t('search-countries')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Countries Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('country-name-en')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('country-name-ar')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('currency-en')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('currency-ar')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('country-code')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredCountries.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                {t('no-countries')}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCountries.map((country) => (
                                            <tr key={country.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {country.name_en}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white" dir="rtl">
                                                    {country.name_ar}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {country.currency_en || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" dir="rtl">
                                                    {country.currency_ar || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md font-mono">
                                                        {country.code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex gap-2">
                                                        <Link href={route('country.edit', country.id)}>
                                                            <Button size="sm" variant="outline">
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(country.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
