import React, { useState, FormEventHandler } from 'react'
import { Head, useForm, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import ImageUpload from '@/components/image-upload'
import { CheckCircle2, Store, User, ArrowRight, ArrowLeft } from 'lucide-react'

type RegisterStoreForm = {
    // User Information (Step 1)
    name: string
    email: string
    password: string
    password_confirmation: string
    // Store Information (Step 2)
    store_name: string
    store_email: string
    store_phone: string
    store_address: string
    store_description: string
    image: File | null
    banner: File | null
}

export default function RegisterStore() {
    const { t } = useTranslation()
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 2

    const { data, setData, post, processing, errors, reset } = useForm<RegisterStoreForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        store_name: '',
        store_email: '',
        store_phone: '',
        store_address: '',
        store_description: '',
        image: null,
        banner: null,
    })

    const handleNextStep = () => {
        // Validate current step before proceeding
        if (currentStep === 1) {
            if (data.name && data.email && data.password && data.password_confirmation) {
                setCurrentStep(2)
            }
        }
    }

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('register.store'), {
            onSuccess: () => {
                // Redirect to front store index page
                router.visit('/')
            },
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <>
            <Head title={t('register-store')} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                            <Store className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('register-store')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('store-registration')}
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between max-w-md mx-auto">
                            {[1, 2].map((step) => (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                                                currentStep >= step
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                            }`}
                                        >
                                            {currentStep > step ? (
                                                <CheckCircle2 className="w-6 h-6" />
                                            ) : (
                                                step
                                            )}
                                        </div>
                                        <span className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                                            {step === 1 ? t('account-info') : t('store-info')}
                                        </span>
                                    </div>
                                    {step < totalSteps && (
                                        <div
                                            className={`flex-1 h-1 mx-2 transition-all ${
                                                currentStep > step
                                                    ? 'bg-primary'
                                                    : 'bg-gray-200 dark:bg-gray-700'
                                            }`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Registration Form */}
                    <Card className="shadow-xl border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {currentStep === 1 ? (
                                    <>
                                        <User className="w-5 h-5" />
                                        {t('create-your-account')}
                                    </>
                                ) : (
                                    <>
                                        <Store className="w-5 h-5" />
                                        {t('setup-your-store')}
                                    </>
                                )}
                            </CardTitle>
                            <CardDescription>
                                {t('step')} {currentStep} {t('of')} {totalSteps}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                {/* Step 1: User Account Information */}
                                {currentStep === 1 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">{t('full-name')}</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-full-name')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">{t('email')}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-email')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">{t('password')}</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-password')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">{t('confirm-password')}</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                required
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('confirm-password')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Store Information */}
                                {currentStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="grid gap-2">
                                            <Label htmlFor="store_name">{t('store-name')}</Label>
                                            <Input
                                                id="store_name"
                                                type="text"
                                                required
                                                autoFocus
                                                value={data.store_name}
                                                onChange={(e) => setData('store_name', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-store-name')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.store_name} />
                                        </div>

                                        <ImageUpload
                                            id="image"
                                            label={t('store-logo')}
                                            required
                                            accept="image/*"
                                            onChange={(file) => setData('image', file)}
                                            disabled={processing}
                                            error={errors.image}
                                            previewClassName="h-40 object-contain"
                                        />

                                        <ImageUpload
                                            id="banner"
                                            label={`${t('store-banner')} (${t('optional')})`}
                                            accept="image/*"
                                            onChange={(file) => setData('banner', file)}
                                            disabled={processing}
                                            error={errors.banner}
                                            previewClassName="h-48 object-cover"
                                        />

                                        <div className="grid gap-2">
                                            <Label htmlFor="store_email">
                                                {t('store-email')} <span className="text-gray-400 text-xs">({t('optional')})</span>
                                            </Label>
                                            <Input
                                                id="store_email"
                                                type="email"
                                                value={data.store_email}
                                                onChange={(e) => setData('store_email', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-store-email')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.store_email} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="store_phone">
                                                {t('store-phone')} <span className="text-gray-400 text-xs">({t('optional')})</span>
                                            </Label>
                                            <Input
                                                id="store_phone"
                                                type="tel"
                                                value={data.store_phone}
                                                onChange={(e) => setData('store_phone', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-store-phone')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.store_phone} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="store_address">
                                                {t('store-address')} <span className="text-gray-400 text-xs">({t('optional')})</span>
                                            </Label>
                                            <Input
                                                id="store_address"
                                                type="text"
                                                value={data.store_address}
                                                onChange={(e) => setData('store_address', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-store-address')}
                                                className="h-11"
                                            />
                                            <InputError message={errors.store_address} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="store_description">
                                                {t('store-description')} <span className="text-gray-400 text-xs">({t('optional')})</span>
                                            </Label>
                                            <textarea
                                                id="store_description"
                                                value={data.store_description}
                                                onChange={(e) => setData('store_description', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('enter-store-description')}
                                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                rows={4}
                                            />
                                            <InputError message={errors.store_description} />
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex gap-3 pt-4">
                                    {currentStep > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handlePreviousStep}
                                            disabled={processing}
                                            className="flex-1"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            {t('previous')}
                                        </Button>
                                    )}

                                    {currentStep < totalSteps ? (
                                        <Button
                                            type="button"
                                            onClick={handleNextStep}
                                            disabled={processing}
                                            className="flex-1"
                                        >
                                            {t('next')}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                    {t('submit')}...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                                    {t('complete-registration')}
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('already-account')}{' '}
                            <a href={route('login')} className="text-primary font-medium hover:underline">
                                {t('login')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
