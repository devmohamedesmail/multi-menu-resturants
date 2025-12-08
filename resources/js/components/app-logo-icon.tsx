import { usePage } from '@inertiajs/react';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const { app_settings }: any = usePage().props;
    
    return (
        
        <div>
            {app_settings && app_settings.logo ? <img className='w-full ' src={`/uploads/${app_settings.logo}`} alt="" /> :''}
          

            <h4>{app_settings && app_settings.title_en ? app_settings.title_ar : ''}</h4>
        </div>
    );
}
