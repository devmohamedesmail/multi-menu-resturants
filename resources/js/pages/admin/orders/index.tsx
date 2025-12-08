
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/dashboard',
    },
];



export default function Orders({ orders }: any) {

   

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className='px-5'>
            <div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr className='bg-primary'>

                                <th className='text-black'>Table No</th>
                                <th className='text-black'>Order</th>
                                <th className='text-black'>Total</th>
                              
                            </tr>
                        </thead>
                        <tbody>

                            {orders && orders.map((order: any) => {
                                const items = JSON.parse(order.order); // هنا نحول الستركنج إلى مصفوفة

                                return (
                                    <tr key={order.id} className='border'>

                                        <td >
                                            {
                                                order.table ? (
                                                    <p className='w-8 h-8 bg-primary flex justify-center items-center rounded-full'>{order.table}</p>
                                                ) : (
                                                    <div>
                                                        <p>{order.address}</p>
                                                        <p>{order.phone}</p>
                                                        <p>{order.name}</p>
                                                    </div>)
                                            }


                                        </td>
                                        <td>
                                            {items.map((item: any, index: number) => (
                                                <div key={index} className='flex justify-between items-center'>

                                                    <div className='flex items-center'>
                                                        <img className='w-16 h-16 rounded-full' src={`/uploads/${item.image}`} alt={item.name_ar} />
                                                        <p className='px-2'>{item.name_ar}</p>
                                                    </div>
                                                    <p className='font-bold bg-primary w-5 h-5 flex justify-center items-center rounded-2xl'>{item.quantity}</p>
                                                </div>
                                            ))}
                                        </td>
                                        <td>{order.total}</td>
                                       

                                       
                                    </tr>
                                );
                            })}





                        </tbody>


                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
