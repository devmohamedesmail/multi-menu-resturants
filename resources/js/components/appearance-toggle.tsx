import React from 'react'
import { Moon, Sun } from "lucide-react"
import { useAppearance } from '@/hooks/use-appearance'
export default function AppearanceToggle() {
    const { appearance, updateAppearance } = useAppearance();
    return (
        <button
            onClick={() => updateAppearance(appearance === 'dark' ? 'light' : 'dark')}
            className="btn btn-ghost btn-circle">
            {appearance === 'dark' ? (
                <Sun className="text-yellow-400" size={22} />
            ) : (

                <Moon className="text-slate-700" size={22} />
            )
            }
        </button>
    )
}
