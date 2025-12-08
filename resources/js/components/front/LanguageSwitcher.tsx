import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
 import { MdLanguage } from "react-icons/md";


const LanguageSwitcher = () => {
  const { i18n: i18next } = useTranslation();
 
  const toggleLanguage = () => {
    const newLang = i18next.language === 'en' ? 'ar' : 'en';
    i18next.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className='btn w-fit h-12 bg-orange-600'>
      {i18next.language === 'en' ? 'العربية' : 'English'}
     <MdLanguage color="white" />
    </button>
  );
};

export default LanguageSwitcher;

