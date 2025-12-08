import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className='h-12 block w-full px-2 border border-gray-400  text-sm focus:outline-none focus:border-primary'
      {...props}
    />
  )
}

export { Input }
