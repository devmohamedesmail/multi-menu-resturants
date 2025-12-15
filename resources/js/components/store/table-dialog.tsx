import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'

interface TableDialogProps {
    table?: any
    onClose: () => void
}

export default function TableDialog({ table, onClose }: TableDialogProps) {
    const { t } = useTranslation()
    const isEdit = Boolean(table)

    const validationSchema = Yup.object({
        name: Yup.string().required(t('store.table-name-required')),
        capacity: Yup.number()
            .required(t('store.capacity-required'))
            .min(1, t('store.capacity-min'))
            .integer(t('store.capacity-integer')),
    })

    const formik = useFormik({
        initialValues: {
            name: table?.name || '',
            capacity: table?.capacity || 4,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (isEdit) {
                router.put(route('store.table.update', table.id), values, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                    },
                    onError: (errors) => {
                        console.error('Update failed:', errors)
                    }
                })
            } else {
                router.post(route('store.table.store'), values, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                    },
                    onError: (errors) => {
                        console.error('Creation failed:', errors)
                    }
                })
            }
        },
    })

    return (
        <dialog id="table_dialog" className="modal modal-open ">
            <div className="modal-box max-w-md bg-white dark:bg-gray-800 relative">
                <button 
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-main hover:bg-second"
                >
                    <X className="w-4 h-4" />
                </button>

                <h3 className="font-bold text-xl mb-6">
                    {isEdit ? t('store.edit-table') : t('store.add-table')}
                </h3>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('store.table-name')}
                        </label>
                        <Input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('store.enter-table-name')}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{String(formik.errors.name)}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {t('store.capacity')}
                        </label>
                        <Input
                            type="number"
                            name="capacity"
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            min="1"
                            placeholder={t('store.enter-capacity')}
                        />
                        {formik.touched.capacity && formik.errors.capacity && (
                            <p className="text-red-500 text-sm mt-1">{String(formik.errors.capacity)}</p>
                        )}
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
                            disabled={formik.isSubmitting}
                            className="flex-1 bg-main hover:bg-second"
                        >
                            {formik.isSubmitting ? t('store.saving') : isEdit ? t('store.update') : t('store.add')}
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
