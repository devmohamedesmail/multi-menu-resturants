
import { useTranslation } from 'react-i18next'

export default function HomeHero({ store , table }: { store: any, table?: string }) {
    const { t } = useTranslation()
    return (
        <section className=" container mx-auto  mb-5 ">

            <div className="flex flex-col items-center justify-center px-4 relative z-10">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {t('welcome-to')}
                </h2>
                <h2 className='text-white font-extrabold text-2xl mt-2'>
                    {store.name}
                </h2>

                <h4 className='text-white mt-3'>{t('store.table-number')}: {table}</h4>

            </div>
        </section>
    )
}
