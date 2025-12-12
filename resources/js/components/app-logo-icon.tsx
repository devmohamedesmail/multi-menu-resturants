import { usePage } from '@inertiajs/react';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const { app_settings }: any = usePage().props;
    
    return (
        
        <div className='bg-red-600 w-full'>
            {app_settings && app_settings.logo ? 
            <img className='w-full ' src={`${app_settings.logo}`} alt="" /> :''}
        </div>
    );
}
