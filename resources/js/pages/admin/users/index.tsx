
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';






export default function users({ users }: any) {
    const { t } = useTranslation()

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('users.title'),
        href: '/dashboard',
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('users.title')} />
            <div className="overflow-x-auto px-10 py-5 rounded-lg shadow-md">
                <table className="table">

                    <thead>
                        <tr>

                            <th className='text-dark'>{t('users.name')}</th>
                            <th className='text-dark'>{t('users.email')}</th>
                            <th className='text-dark'>{t('users.role')}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user: any) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link href={route('admin.users.change.role', user.id)}>{user.role}</Link>
                                </td>

                            </tr>
                        ))}



                    </tbody>

                </table>
            </div>
        </AppLayout>
    );
}
