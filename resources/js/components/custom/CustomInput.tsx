
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CustomInput({ label, type, value, onChange, ...props }: any) {
  const { t ,i18n } = useTranslation();

  return (
    <div className='mb-3'>
      <label className={`block mb-1 text-white ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{label}</label>
      <input {...props} type={type} value={value} onChange={onChange} className='w-full border  h-12 text-white px-2 focus:border-primary focus:outline-0' />
    </div>
  )
}
