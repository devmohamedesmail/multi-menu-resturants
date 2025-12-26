import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart, Send, Truck, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cart-item'
import DeliveryInfoModal from './delivery-info-modal'
import { router } from '@inertiajs/react'
import { reset_cart } from '@/reducers/cartSlice'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Props {
    store: {
        name: string
    },
    table?: string
}
export default function HomeFloatButtons({ table, store }: Props) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cart.meals)
    const [showDeliveryModal, setShowDeliveryModal] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [openCartDialog, setopenCartDialog] = useState(false)

    const handleTableOrder = () => {
        
        if (!cart || cart.length === 0) {
            alert(t('store.cart-empty'))
            return
        }

        // Calculate total
        const total = cart.reduce((sum: number, item: any) => {
            const basePrice = parseFloat(item.price) || 0
            const attributesPrice = item.selectedAttributes?.reduce((attrSum: number, attr: any) => {
                return attrSum + (parseFloat(attr.price_modifier) || 0)
            }, 0) || 0
            return sum + ((basePrice + attributesPrice) * item.quantity)
        }, 0)

        router.post(route('store.create.order'), {
            store_id: store?.id,
            table_id: table || null,
            table: table || null,
            order: JSON.stringify(cart),
            total: total.toFixed(2),
            name: null,
            phone: null,
            address: null,
            location: null,
            note: null,
        }, {
            onSuccess: () => {
                dispatch(reset_cart())
                    
                setShowSuccess(true)
            },
            onError: (errors) => {
                console.log('Order creation failed:', errors)
            }
        })
    }

    const handleDeliveryOrder = () => {
        if (!cart || cart.length === 0) {
            alert(t('store.cart-empty'))
            return
        }
        setShowDeliveryModal(true)
    }

    return (
        <>
            <div className="fixed bottom-4 right-4 left-4  gap-2 z-50 block md:hidden">
                <div className='bg-black bg-opacity-50 rounded-lg p-2 flex flex-row gap-2'>
                    <Button
                        // onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}
                        onClick={() => setopenCartDialog(true)}
                        className='flex-1 bg-main hover:bg-second'
                    >
                        {t('store.show-cart')}
                        <ShoppingCart />
                    </Button>

                    {table ? (
                        <Button
                            onClick={handleTableOrder}
                            disabled={!cart || cart.length === 0}
                            className='flex-1 bg-second hover:bg-main'
                        >
                            {t('store.send-order')}
                            <Send />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleDeliveryOrder}
                            disabled={!cart || cart.length === 0}
                            className='flex-1 bg-second hover:bg-main'
                        >
                            {t('store.delivery-order')}
                            <Truck />
                        </Button>
                    )}
                </div>
            </div>




            {/* cart Dialog */}

            <Dialog
                open={openCartDialog}
                onOpenChange={setopenCartDialog}
            >

                <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {t('store.cart')}
                        </DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>

                    {cart && cart?.length > 0 ? (<>
                        {cart.map((item: any) => (
                            <CartItem key={item.id} item={item} />
                        ))}

                    </>) : (<p className='text-center'>{t('store.cart-empty')}</p>)}

                    <div className='flex items-center justify-center'>
                        <Button onClick={()=>handleTableOrder()}>
                            {t('store.send_order')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>







            {showDeliveryModal && (
                <DeliveryInfoModal
                    store_id={store?.id}
                    onClose={() => setShowDeliveryModal(false)}
                />
            )}



            {/* success modal */}
            <Dialog
                open={showSuccess}
                onOpenChange={setShowSuccess}
            >

                <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>

                        </DialogTitle>

                    </DialogHeader>

                    <div className="modal-box text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="font-bold text-2xl mb-2">{t('store.order-success')}</h3>
                        <p className="text-lg mb-4">{t('store.thank-you')}</p>
                        <Button
                            onClick={() => setShowSuccess(false)}
                            className="bg-main hover:bg-second"
                        >
                            {t('store.close')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
