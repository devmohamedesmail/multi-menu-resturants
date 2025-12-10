import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ImageUpload from '@/components/image-upload'
import { Loader2 } from 'lucide-react'

interface Category {
    id: number
    name_en: string
    name_ar: string
}

interface AttributeValue {
    id: number
    value_en: string
    value_ar: string
    price_modifier: number
}

interface Attribute {
    id: number
    name_en: string
    name_ar: string
    type: 'select' | 'radio' | 'checkbox'
    is_required: boolean
    values: AttributeValue[]
}

interface MealAttribute {
    attribute_id: number
    attribute_value_id: number
}

interface Meal {
    id?: number
    name_en: string
    name_ar: string
    description_en?: string
    description_ar?: string
    image: string
    price: number
    sale_price?: number
    category: {
        id: number
    }
    attributes?: MealAttribute[]
}

interface Props {
    open: boolean
    onClose: () => void
    categories: Category[]
    attributes?: Attribute[]
    meal?: Meal
}

export default function MealDialog({ open, onClose, categories, attributes = [], meal }: Props) {
    
    
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedAttributes, setSelectedAttributes] = useState<Record<number, number>>(
        meal?.attributes?.reduce((acc, attr) => {
            acc[attr.attribute_id] = attr.attribute_value_id
            return acc
        }, {} as Record<number, number>) || {}
    )

    const validationSchema = Yup.object({
        category_id: Yup.number().required(t('required-field')),
        name_en: Yup.string().required(t('required-field')),
        name_ar: Yup.string().required(t('required-field')),
        description_en: Yup.string(),
        description_ar: Yup.string(),
        price: Yup.number().min(0, t('must-be-positive')).required(t('required-field')),
        sale_price: Yup.number().min(0, t('must-be-positive')),
    })

    const formik = useFormik({
        initialValues: {
            category_id: meal?.category.id || '',
            name_en: meal?.name_en || '',
            name_ar: meal?.name_ar || '',
            description_en: meal?.description_en || '',
            description_ar: meal?.description_ar || '',
            price: meal?.price || '',
            sale_price: meal?.sale_price || '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append('category_id', values.category_id.toString())
            formData.append('name_en', values.name_en)
            formData.append('name_ar', values.name_ar)
            formData.append('description_en', values.description_en)
            formData.append('description_ar', values.description_ar)
            formData.append('price', values.price.toString())
            if (values.sale_price) {
                formData.append('sale_price', values.sale_price.toString())
            }
            
            // Add attributes
            formData.append('attributes', JSON.stringify(selectedAttributes))
            
            if (imageFile) {
                formData.append('image', imageFile)
            } else if (!meal) {
                formik.setFieldError('image', t('required-field'))
                return
            }

            if (meal?.id) {
                formData.append('_method', 'PUT')
                router.post(route('store.meal.update', meal.id), formData, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                        setImageFile(null)
                        setSelectedAttributes({})
                    },
                    onError: (errors) => {
                        formik.setErrors(errors)
                    },
                })
            } else {
                router.post(route('store.meal.store'), formData, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                        setImageFile(null)
                        setSelectedAttributes({})
                    },
                    onError: (errors) => {
                        formik.setErrors(errors)
                    },
                })
            }
        },
    })

    const handleImageChange = (file: File | null) => {
        setImageFile(file)
    }

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {meal ? t('edit-meal') : t('add-meal')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('fill-meal-details')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Category Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="category_id">{t('category')}</Label>
                        <Select
                            value={formik.values.category_id.toString()}
                            onValueChange={(value) => formik.setFieldValue('category_id', parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('select-category')} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.name_en} - {cat.name_ar}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formik.touched.category_id && formik.errors.category_id && (
                            <p className="text-sm text-red-500">{formik.errors.category_id}</p>
                        )}
                    </div>

                    {/* English Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name_en">{t('meal-name-en')}</Label>
                        <Input
                            id="name_en"
                            name="name_en"
                            value={formik.values.name_en}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('enter-meal-name-en')}
                        />
                        {formik.touched.name_en && formik.errors.name_en && (
                            <p className="text-sm text-red-500">{formik.errors.name_en}</p>
                        )}
                    </div>

                    {/* Arabic Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name_ar">{t('meal-name-ar')}</Label>
                        <Input
                            id="name_ar"
                            name="name_ar"
                            value={formik.values.name_ar}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('enter-meal-name-ar')}
                            dir="rtl"
                        />
                        {formik.touched.name_ar && formik.errors.name_ar && (
                            <p className="text-sm text-red-500">{formik.errors.name_ar}</p>
                        )}
                    </div>

                    {/* English Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description_en">{t('description-en')}</Label>
                        <Textarea
                            id="description_en"
                            name="description_en"
                            value={formik.values.description_en}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('enter-description-en')}
                            rows={3}
                        />
                    </div>

                    {/* Arabic Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description_ar">{t('description-ar')}</Label>
                        <Textarea
                            id="description_ar"
                            name="description_ar"
                            value={formik.values.description_ar}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('enter-description-ar')}
                            dir="rtl"
                            rows={3}
                        />
                    </div>

                    {/* Price and Sale Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">{t('price')}</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="0.00"
                            />
                            {formik.touched.price && formik.errors.price && (
                                <p className="text-sm text-red-500">{formik.errors.price}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sale_price">{t('sale-price')}</Label>
                            <Input
                                id="sale_price"
                                name="sale_price"
                                type="number"
                                step="0.01"
                                value={formik.values.sale_price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="0.00"
                            />
                            {formik.touched.sale_price && formik.errors.sale_price && (
                                <p className="text-sm text-red-500">{formik.errors.sale_price}</p>
                            )}
                        </div>
                    </div>

                    {/* Attributes Section */}
                    {attributes.length > 0 && (
                        <div className="space-y-4 border-t pt-4">
                            <h3 className="text-lg font-semibold">{t('meal-attributes')}</h3>
                            
                            {attributes.map((attribute) => (
                                <div key={attribute.id} className="space-y-2">
                                    <Label htmlFor={`attribute-${attribute.id}`}>
                                        {isArabic ? attribute.name_ar : attribute.name_en}
                                        {attribute.is_required && <span className="text-red-500 ml-1">*</span>}
                                    </Label>

                                     <Select
                                            value={selectedAttributes[attribute.id]?.toString() || ''}
                                            onValueChange={(value) => 
                                                setSelectedAttributes(prev => ({
                                                    ...prev,
                                                    [attribute.id]: parseInt(value)
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('select-option')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {attribute.values.map((value) => (
                                                    <SelectItem key={value.id} value={value.id.toString()}>
                                                        {isArabic ? value.value_ar : value.value_en}
                                                        {value.price_modifier !== 0 && (
                                                            <span className="text-orange-500 ml-2">
                                                                ({value.price_modifier > 0 ? '+' : ''}{value.price_modifier})
                                                            </span>
                                                        )}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    
                                   
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <ImageUpload
                            id="meal-image"
                            label={t('meal-image')}
                            onChange={handleImageChange}
                        />
                        {!imageFile && !meal && (
                            <p className="text-sm text-red-500">{t('image-required')}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={formik.isSubmitting}
                        >
                            {t('cancel')}
                        </Button>
                        <Button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {meal ? t('update') : t('create')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
