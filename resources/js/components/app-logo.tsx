import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import { useTranslation } from 'react-i18next';

export default function AppLogo() {
    const { app_settings }: any = usePage().props;
    const {t , i18n}=useTranslation();
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">
                    {i18n.language === 'ar' ? app_settings?.title_ar : app_settings?.title_en}
                </span>
            </div>
        </>
    );
}
