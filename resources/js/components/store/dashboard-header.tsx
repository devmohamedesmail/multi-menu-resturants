import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, usePage } from '@inertiajs/react'
import { LogOut, Home, UserRound, } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '../ui/dropdown-menu'


export default function DashboardHeader() {
    const { t } = useTranslation()
    const { store, auth }: any = usePage().props
    const user = auth?.user
    return (
        <>
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <img
                                src={store?.image}
                                className="w-16 h-16 rounded-full object-cover border-white border-2"
                                alt={store?.name} />
                        </div>
                        <div>
                            <h3 className='text-primary'>{store?.name}</h3>
                        </div>



                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-fit h-10 px-3 flex items-center rounded-full overflow-hidden border-2 border-white cursor-pointer">
                                <UserRound  /> <span>{user?.name}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link

                                        href={`/store/home/${store?.name}/${store?.id}`}
                                        className="w-full flex items-center gap-2 cursor-pointer"
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>{t('store.view-menu')}</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center gap-2 text-red-600 cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>{t('auth.logout')}</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <h1 className="text-2xl font-bold text-gray-900 text-center my-5 dark:text-white">
                {t('dashboard.restaurant-dashboard')}
            </h1>

        </>

    )
}
