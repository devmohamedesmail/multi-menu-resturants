import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Globe, Languages } from 'lucide-react'

export default function LanguageSelect() {
    const { t, i18n } = useTranslation();

    function changeLanguage(lang: string) {
        i18n.changeLanguage(lang);
    }

    return (
        <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-[140px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t('common.select-language')}/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en"> English </SelectItem>
                <SelectItem value="ar"> العربية </SelectItem>
            </SelectContent>
        </Select>
    )
}
