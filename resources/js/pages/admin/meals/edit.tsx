
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { CiImageOn } from "react-icons/ci";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/dashboard',
    },
];



export default function Meals({ categories, meal }: any) {
   const { t } = useTranslation()
   
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        categoryId: meal.category_id,
        name_en: meal.name_en,
        name_ar: meal.name_ar,
        description_en: meal.description_en,
        description_ar: meal.description_ar,
        price: meal.price,
        image: '',
    });

    const add_meal = (e: any) => {
        e.preventDefault();
        post(route('meal.update.confirm', { id: meal.id }), {
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
            <Head title="Meals" />
            <div className='grid grid-cols-12 gap-4 container mx-auto px-4 my-10'>
                <div className='col-span-12 md:col-span-5'>

                    <form onSubmit={add_meal}>


                        <div className="mb-3">
                            <label>{t('select-category')}</label>
                            <select
                                value={data.categoryId}
                                onChange={(e) => setData('categoryId', e.target.value)}
                                className="select select-primary w-full bg-transparent border focus:outline-0 rounded"
                            >
                                <option value="0" disabled> {t('select-category')} </option>
                                {categories && categories.map((category: any) => (
                                    <option key={category.id} value={category.id}>{category.name_en}</option>
                                ))}
                            </select>
                        </div>





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
                            <Label>{t('description-en')}</Label>
                            <Input type="text" value={data.description_en} onChange={(e) => setData('description_en', e.target.value)} />
                            <InputError message={errors.name_en} />
                        </div>
                        <div className='mb-3'>
                            <Label>{t('description-ar')}</Label>
                            <Input type="text" value={data.description_ar} onChange={(e) => setData('description_ar', e.target.value)} />
                            <InputError message={errors.name_en} />
                        </div>

                        <div className='mb-3'>
                            <Label>{t('price')}</Label>
                            <Input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                            <InputError message={errors.name_en} />
                        </div>

                        <div className='mb-3'>
                            <img src={`/uploads/${meal.image}`} className='w-44 h-44 rounded-lg' alt="" />
                            <label htmlFor="image" className='border border-dashed flex justify-center items-center gap-2 py-10'>
                                <input type="file" className='hidden' id='image' onChange={handleImageChange} />
                                <CiImageOn size={30} />
                                <p>
                                   {t('select-image')}

                                </p>
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
