
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/dashboard',
    },
];



export default function users({ users }: any) {
    const { t } = useTranslation()





    console.log(users)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>

                            <th className='text-dark'>Name</th>
                            <th className='text-dark'>Email</th>
                            <th className='text-dark'>Role</th>

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
