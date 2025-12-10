import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Languages } from 'lucide-react'

export default function LanguageSelect() {
    const { i18n } = useTranslation();

    function changeLanguage(lang: string) {
        i18n.changeLanguage(lang);
    }

    return (
        <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-[140px]">
                <Languages className="w-4 h-4 mr-2" />
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
        </Select>
    )
}
