
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,  useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { CiImageOn } from "react-icons/ci";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Setting',
        href: '/dashboard',
    },
];



export default function Setting({ setting }: any) {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        title_en: setting.title_en || '',
        title_ar: setting.title_ar || '',
        logo: '',
        favicon: '',
        email: setting.email || '',
        phone: setting.phone || '',
        address: setting.address || '',
        description_en: setting.description_en || '',
        description_ar: setting.description_ar || '',
        currency_en: setting.currency_en || '',
        currency_ar: setting.currency_ar || '',
    });

    const update_setting = (e: any) => {
        e.preventDefault();
        post(route('update.settings'));
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData('logo', file);
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
            <div className='px-5 py-10'>
                <form onSubmit={update_setting}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Arabic */}
                        <div>
                            <div className='mb-3'>
                                <Label>{t('name-ar')}</Label>
                                <Input type="text" value={data.title_ar} onChange={(e) => setData('title_ar', e.target.value)} />
                                <InputError message={errors.title_ar} />
                            </div>

                            <div className='mb-3'>
                                <Label>{t('description-ar')}</Label>
                                <Input type="text" value={data.description_ar} onChange={(e) => setData('description_ar', e.target.value)} />
                                <InputError message={errors.description_ar} />
                            </div>

                            <div className='mb-3'>
                                <Label>{t('currency-en')}</Label>
                                <Input type="text" value={data.currency_ar} onChange={(e) => setData('currency_ar', e.target.value)} />
                                <InputError message={errors.currency_ar} />
                            </div>
                        </div>
                        {/* English */}
                        <div>
                            <div className='mb-3'>
                                <Label>{t('name-en')}</Label>
                                <Input type="text" value={data.title_en} onChange={(e) => setData('title_en', e.target.value)} />
                                <InputError message={errors.title_en} />
                            </div>

                            <div className='mb-3'>
                                <Label>{t('description-en')}</Label>
                                <Input type="text" value={data.description_en} onChange={(e) => setData('description_en', e.target.value)} />
                                <InputError message={errors.description_en} />
                            </div>
                            <div className='mb-3'>
                                <Label>{t('currency-ar')}</Label>
                                <Input type="text" value={data.currency_en} onChange={(e) => setData('currency_en', e.target.value)} />
                                <InputError message={errors.currency_en} />
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <div className='mb-3'>
                            <Label>Image</Label>
                            <Input type="file" onChange={(e: any) => setData('logo', e.target.files[0])} />
                            <InputError message={errors.logo} />
                        </div> */}
                        <div className='mb-3'>
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
                            <InputError message={errors.logo} />
                        </div>
                        <div className='mb-3'>
                            <Label>Favicon</Label>
                            <Input type="file" onChange={(e: any) => setData('favicon', e.target.files[0])} />
                            <InputError message={errors.favicon} />
                        </div>


                        <div className='mb-3'>
                            <Label>{t('email')}</Label>
                            <Input type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            <InputError message={errors.email} />
                        </div>

                        <div className='mb-3'>
                            <Label>{t('phone')}</Label>
                            <Input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            <InputError message={errors.phone} />
                        </div>

                        <div className='mb-3'>
                            <Label>{t('address')}</Label>
                            <Input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            <InputError message={errors.address} />
                        </div>


                        <div>
                            <Button disabled={processing}>
                                {processing ? 'Saving...' : t('update')}
                            </Button>
                        </div>

                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
