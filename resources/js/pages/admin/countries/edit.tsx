import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'

interface Country {
    id: number
    name_en: string
    name_ar: string
    currency_en: string
    currency_ar: string
    code: string
}

interface Props {
    country: Country
}

export default function EditCountryPage({ country }: Props) {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        name_en: country.name_en,
        name_ar: country.name_ar,
        currency_en: country.currency_en || '',
        currency_ar: country.currency_ar || '',
        code: country.code,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.post(route('country.update', country.id), formData)
    }

    return (
        <AppLayout>
            <Head title={t('edit-country')} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={route('countries.page')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('edit-country')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('update-country-details')}
                        </p>
                    </div>
                </div>

                {/* Edit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('country-information')}</CardTitle>
                        <CardDescription>{t('update-country-info-desc')}</CardDescription>
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

                            <div className="flex justify-end gap-3 pt-4">
                                <Link href={route('countries.page')}>
                                    <Button type="button" variant="outline">
                                        {t('cancel')}
                                    </Button>
                                </Link>
                                <Button type="submit">{t('update')}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
