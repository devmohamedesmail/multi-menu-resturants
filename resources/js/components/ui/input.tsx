import * as React from "react"

import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const {t , i18n}=useTranslation();
  return (
    <input
      type={type}
      data-slot="input"
      className={`h-12 block w-full px-2 border border-gray-400  text-sm focus:outline-none focus:border-primary ${i18n.language === 'ar' ? 'text-right' : ''} ${className}`}
      {...props}
    />
  )
}

export { Input }
