import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, User, ChefHat } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '@/components/ui/language-select';
import { usePage } from '@inertiajs/react';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { t,i18n } = useTranslation();
    const {app_settings}:any = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title={t('auth.register')} />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block">
                        <div className="space-y-6">
                            <Link href={route('home')} className="inline-flex items-center gap-3 mb-8">
                                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg">
                
                                    <img src={app_settings.logo} alt={app_settings.title_ar} className='w-20 h-20' />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en}
                                </span>
                            </Link>
                            
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {t('auth.start-your-journey')}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    {t('auth.register-description')}
                                </p>
                            </div>
                            
                            <div className="relative mt-8">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-3xl opacity-20" />
                                <img
                                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
                                    alt={i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en}
                                    className="relative rounded-2xl shadow-2xl w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="w-full">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl opacity-10" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-400 to-red-400 rounded-full blur-3xl opacity-10" />
                            
                            <div className="relative z-10">
                                {/* Mobile Logo */}
                                <div className="lg:hidden flex items-center justify-between mb-8">
                                    <Link href={route('home')} className="flex items-center gap-2">
                                        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl">
                                            <img src={app_settings.logo} alt={i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en} className="w-6 h-6" />
                                        </div>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                                         
                                            {i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en}
                                        </span>
                                    </Link>
                                    <LanguageSelect />
                                </div>

                                {/* Desktop Language Selector */}
                                <div className="hidden lg:flex justify-end mb-6">
                                    <LanguageSelect />
                                </div>
                                
                                <div className="space-y-2 mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {t('auth.create-account')}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {t('auth.fill-details')}
                                    </p>
                                </div>

                                <form onSubmit={submit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            {t('auth.name')}
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                autoComplete="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('auth.enter-full-name')}
                                                className="pl-11 h-12 border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </div>
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            {t('auth.email')}
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('auth.enter-email')}
                                                className="pl-11 h-12 border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            {t('auth.password')}
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('auth.password-placeholder')}
                                                className="pl-11 h-12 border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation" className="text-sm font-medium">
                                            {t('auth.confirm-password')}
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                disabled={processing}
                                                placeholder={t('auth.password-placeholder')}
                                                className="pl-11 h-12 border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                                {t('auth.creating-account')}
                                            </>
                                        ) : (
                                            t('auth.create-account')
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-8 text-center">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {t('auth.already-account')}{' '}
                                        <Link
                                            href={route('login')}
                                            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-semibold"
                                        >
                                            {t('auth.login')}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
