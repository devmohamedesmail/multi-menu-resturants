
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



export default function Categories({ category }: any) {
    const { t } = useTranslation()
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name_en: category.name_en,
        name_ar: category.name_ar,
        image: '',
    });

    const update_category = (e: any) => {
        e.preventDefault();
        post(route('category.update.confirm', { id: category.id }), {
            forceFormData: true,
        });
        
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

                    <form onSubmit={update_category}>
                        <div className='mb-3'>
                            <Label>{t('name-en')}</Label>
                            <Input type="text" value={data.name_en} onChange={(e) => setData('name_en', e.target.value)} />
                            <InputError message={errors.name_en} />
                        </div>
                        <div className='mb-3'>
                            <Label>{t('name-ar')}</Label>
                            <Input type="text" value={data.name_ar} onChange={(e) => setData('name_ar', e.target.value)} />
                            <InputError message={errors.name_en} />
                        </div>

                        <div className='mb-3'>
                            <img src={`/uploads/${category.image}`} className='w-44 h-44 rounded-lg' alt="" />
                            <label htmlFor="image" className='border border-dashed flex justify-center items-center gap-2 py-10'>
                                <input type="file" className='hidden' id='image' onChange={handleImageChange} />
                                <CiImageOn size={30} />
                                <p>{t('select-image')}</p>
                            </label>
                            {imagePreview && (
                                <div className='mt-3'>
                                    <img src={imagePreview} alt="Image preview" className='w-44 h-44  rounded-lg' />
                                </div>
                            )}
                            <InputError message={errors.image} />
                        </div>

                        <Button type='submit'>{t('update')}</Button>
                    </form>

                </div>
              
            </div>
        </AppLayout>
    );
}
