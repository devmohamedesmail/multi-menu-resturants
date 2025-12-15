import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, ChefHat } from 'lucide-react';
import { FormEventHandler } from 'react';
import { usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '@/components/ui/language-select';


type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { t, i18n } = useTranslation();
    const {app_settings}:any = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title={t('auth.login')} />
            
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block">
                        <div className="space-y-6">
                            <Link href={route('home')} className="inline-flex items-center gap-3 mb-8">
                                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg">
                                    {/* <ChefHat className="w-8 h-8 text-white" /> */}
                                    <img src={app_settings.logo} alt={app_settings.title_ar} className='w-20 h-20' />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en}
                                </span>
                            </Link>
                            
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {t('auth.welcome-back')}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    {t('auth.login-description')}
                                </p>
                            </div>
                            
                            <div className="relative mt-8">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-3xl opacity-20" />
                                <img
                                    src="/assets/login-img.png"
                                    alt={app_settings.title_en}
                                    className="relative rounded-2xl shadow-2xl w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
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
                                            {/* <ChefHat className="w-6 h-6 text-white" /> */}
                                            <img src={app_settings.logo} alt={app_settings.title_ar} className='w-12 h-12' />
                                        </div>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                                            
                                           { i18n.language === 'ar' ? app_settings.title_ar : app_settings.title_en}
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
                                        {t('auth.login-to-account')}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {t('auth.enter-credentials')}
                                    </p>
                                </div>

                                {status && (
                                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center text-sm font-medium text-green-600 dark:text-green-400">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
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
                                                autoFocus
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder={t('auth.email-placeholder')}
                                                className="pl-11 h-12 border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="text-sm font-medium">
                                                {t('auth.password')}
                                            </Label>
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium"
                                                >
                                                    {t('auth.forgot-password')}
                                                </Link>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="••••••••"
                                                className="pl-11 h-12 border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onClick={() => setData('remember', !data.remember)}
                                            className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                        />
                                        <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                            {t('auth.remember')}
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                                {t('auth.logging-in')}
                                            </>
                                        ) : (
                                            t('auth.login')
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-8 text-center">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {t('auth.no-account')}{' '}
                                        <Link
                                            href={route('register')}
                                            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-semibold"
                                        >
                                            {t('auth.sign-up')}
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
