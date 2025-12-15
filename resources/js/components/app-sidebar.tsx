import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CircleDashed } from 'lucide-react';
import AppLogo from './app-logo';
import LanguageSwitcher from './front/LanguageSwitcher';
import { useTranslation } from 'react-i18next';



export function AppSidebar() {
    const {t}=useTranslation()

    const mainNavItems: NavItem[] = [
        {
            title: t('dashboard.title'),
            href: '/dashboard',
            icon: CircleDashed,
        },
       
        {
            title: t('dashboard.setting'),
            href: '/admin/settings',
            icon: CircleDashed,
        },
        {
            title: t('dashboard.users'),
            href: '/admin/users',
            icon: CircleDashed,
        },
        {
            title: t('dashboard.countries'),
            href: '/admin/countries',
            icon: CircleDashed,
        },
        {
            title: t('dashboard.banners'),
            href: '/admin/banners',
            icon: CircleDashed,
        },
    ];
    
    const footerNavItems: NavItem[] = [
       
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
               
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
                <div className='bottom-0 '>
                    <LanguageSwitcher />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
