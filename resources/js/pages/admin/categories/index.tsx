
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



export default function Categories({ categories }: any) {
    const { t } = useTranslation()
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name_en: '',
        name_ar: '',
        image: '',
    });

    const add_category = (e: any) => {
        e.preventDefault();

        post(route('category.store'));
        setData('name_ar', '');
        setData('name_en', '');
        setData('image', '');
        setImagePreview(null)

    }


    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className='grid grid-cols-12 gap-4 container mx-auto px-4 my-10'>
                <div className='col-span-12 md:col-span-5'>

                    <form onSubmit={add_category}>
                        <div className='mb-3'>
                            <Label>
                                {t('common.name-en')}
                            </Label>
                            <Input type="text" value={data.name_en} onChange={(e) => setData('name_en', e.target.value)} />
                            <InputError message={errors.name_en} />
                        </div>
                        <div className='mb-3'>
                            <Label>
                                {t('common.name-ar')}
                            </Label>
                            <Input type="text" value={data.name_ar} onChange={(e) => setData('name_ar', e.target.value)} />
                            <InputError message={errors.name_ar} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="image" className='border border-dashed flex justify-center items-center gap-2 py-10'>
                                <input type="file" className='hidden' id='image' onChange={handleImageChange} />
                                <CiImageOn size={30} />
                                <p>{t('common.select-image')}</p>
                            </label>
                            {imagePreview && (
                                <div className='mt-3'>
                                    <img src={imagePreview} alt="Image preview" className='w-44 h-44  rounded-lg' />
                                </div>
                            )}
                            <InputError message={errors.image} />
                        </div>

                        <Button type='submit'>{t('common.save')}</Button>
                    </form>

                </div>
                <div className='col-span-12 md:col-span-5'>
                    <div className='grid grid-cols-3 gap-1'>
                        {categories && categories.map((category: any) => (
                            <div className='border border-gray-300 overflow-hidden rounded-2xl pb-3'>
                                <img src={`/uploads/${category.image}`} alt={category.name_en} />
                                <div className='p-2 flex flex-col justify-center items-center'>
                                    <p>{category.name_en}</p>
                                    <p>{category.name_ar}</p>
                                </div>
                                <div className='flex mt-2'>
                                    <Link href={route('category.edit', category.id)} className='btn btn-success bg-green-600 mx-1 flex-1'>
                                        <MdEdit color='white' />
                                    </Link>
                                    <Link 
                                    href={route('category.delete', category.id)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (confirm('Are you sure you want to delete this category?')) {
                                            window.location.href = route('category.delete', category.id);
                                        }
                                    }}
                                    className='btn btn-error bg-red-600 mx-1 flex-1'>
                                        <FaTrash color='white' />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
