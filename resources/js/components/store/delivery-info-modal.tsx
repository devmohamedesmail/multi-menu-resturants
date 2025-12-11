import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { X, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { useSelector, useDispatch } from 'react-redux'
import { reset_cart } from '@/reducers/cartSlice'

interface DeliveryInfoModalProps {
    store_id: number
    onClose: () => void
}

export default function DeliveryInfoModal({ store_id, onClose }: DeliveryInfoModalProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cart.meals)
    const [showSuccess, setShowSuccess] = useState(false)
    const [orderId, setOrderId] = useState<number | null>(null)

    const validationSchema = Yup.object({
        name: Yup.string().required(t('store.name-required')),
        phone: Yup.string().required(t('store.phone-required')),
        address: Yup.string().required(t('store.address-required')),
        location: Yup.string().nullable(),
        note: Yup.string().nullable(),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
            location: '',
            note: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Calculate total
            const total = cart.reduce((sum: number, item: any) => {
                const basePrice = parseFloat(item.price) || 0
                const attributesPrice = item.selectedAttributes?.reduce((attrSum: number, attr: any) => {
                    return attrSum + (parseFloat(attr.price_modifier) || 0)
                }, 0) || 0
                return sum + ((basePrice + attributesPrice) * item.quantity)
            }, 0)

            router.post(route('store.create.order'), {
                store_id,
                table_id: null,
                table: null,
                order: JSON.stringify(cart),
                total: total.toFixed(2),
                name: values.name,
                phone: values.phone,
                address: values.address,
                location: values.location || null,
                note: values.note || null,
            }, {
                onSuccess: (page: any) => {
                    dispatch(reset_cart())
                    formik.resetForm()
                    setShowSuccess(true)
                },
                onError: (errors) => {
                    console.error('Order creation failed:', errors)
                }
            })
        },
    })

    const handleCloseSuccess = () => {
        setShowSuccess(false)
        onClose()
    }

    if (showSuccess) {
        return (
            <dialog id="success_modal" className="modal modal-open">
                <div className="modal-box text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-bold text-2xl mb-2">{t('store.order-success')}</h3>
                    <p className="text-lg mb-4">{t('store.thank-you')}</p>
                    <Button
                        onClick={handleCloseSuccess}
                        className="bg-main hover:bg-second"
                    >
                        {t('store.close')}
                    </Button>
                </div>
            </dialog>
        )
    }

    return (
        <dialog id="delivery_modal" className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <button 
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-main hover:bg-second"
                >
                    <X className="w-4 h-4" />
                </button>

                <h3 className="font-bold text-lg mb-4">{t('store.delivery-info')}</h3>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('store.customer-name')}
                        </label>
                        <Input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('store.enter-name')}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('store.customer-phone')}
                        </label>
                        <Input
                            type="tel"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('store.enter-phone')}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('store.delivery-address')}
                        </label>
                        <Textarea
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows={3}
                            placeholder={t('store.enter-address')}
                        />
                        {formik.touched.address && formik.errors.address && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('store.location-link')} ({t('store.optional')})
                        </label>
                        <Input
                            type="text"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('store.enter-location')}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('store.order-note')} ({t('store.optional')})
                        </label>
                        <Textarea
                            name="note"
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows={2}
                            placeholder={t('store.enter-note')}
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-500 hover:bg-gray-600"
                        >
                            {t('store.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            disabled={formik.isSubmitting || cart.length === 0}
                            className="flex-1 bg-main hover:bg-second"
                        >
                            {formik.isSubmitting ? t('store.submitting') : t('store.confirm-order')}
                        </Button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}
