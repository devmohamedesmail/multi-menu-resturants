import React, { useState } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    ShoppingBag,
    User,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
    CheckCircle,
    XCircle,
    Clock,
    MapPinned,
    StickyNote,
    Package,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { router } from '@inertiajs/react'

interface Order {
    id: number
    store_id: number
    user_id: number | null
    table_id: number | null
    table: string | null
    status: 'pending' | 'completed' | 'cancelled'
    total: string
    order: any[]
    name: string | null
    address: string | null
    phone: string | null
    location: string | null
    note: string | null
    created_at: string
    updated_at: string
}

export default function DashboardOrdersTab({ orders }: { orders: Order[] }) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500 hover:bg-yellow-600'
            case 'completed':
                return 'bg-green-500 hover:bg-green-600'
            case 'cancelled':
                return 'bg-red-500 hover:bg-red-600'
            default:
                return 'bg-gray-500 hover:bg-gray-600'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4" />
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            case 'cancelled':
                return <XCircle className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }

    const handleStatusChange = (orderId: number, newStatus: 'completed' | 'cancelled') => {
        router.post(route('store.order.update.status', orderId), {
            status: newStatus
        }, {
            onSuccess: () => {
                console.log('Order status updated')
            },
            onError: (errors) => {
                console.error('Failed to update order status:', errors)
            }
        })
    }

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return date.toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch {
            return dateString
        }
    }

    return (
        <TabsContent value="orders" className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">{t('store.orders')}</CardTitle>
                            <CardDescription>{t('store.manage-orders')}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                            {orders?.length || 0} {t('store.total-orders')}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    {!orders || orders.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg">{t('store.no-orders')}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Card key={order.id} className="overflow-hidden">
                                    <div className="bg-gradient-to-r from-main to-second p-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ShoppingBag className="w-6 h-6" />
                                                <div>
                                                    <h3 className="font-bold text-lg">
                                                        {t('store.order-number')}: #{order.id}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm opacity-90">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(order.created_at)}
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className={`${getStatusColor(order.status)} text-white flex items-center gap-1`}>
                                                {getStatusIcon(order.status)}
                                                {t(`store.status-${order.status}`)}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-4">
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            {/* Customer Info or Table Info */}
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-sm text-gray-600 uppercase">
                                                    {order.table ? t('store.table-info') : t('store.customer-info')}
                                                </h4>
                                                {order.table ? (
                                                    <div className="flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-main" />
                                                        <span className="font-medium">{t('store.table')}: {order.table}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {order.name && (
                                                            <div className="flex items-center gap-2">
                                                                <User className="w-5 h-5 text-main" />
                                                                <span>{order.name}</span>
                                                            </div>
                                                        )}
                                                        {order.phone && (
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="w-5 h-5 text-main" />
                                                                <span dir="ltr">{order.phone}</span>
                                                            </div>
                                                        )}
                                                        {order.address && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-5 h-5 text-main" />
                                                                <span>{order.address}</span>
                                                            </div>
                                                        )}
                                                        {order.location && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPinned className="w-5 h-5 text-main" />
                                                                <a href={order.location} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                    {t('store.view-location')}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {order.note && (
                                                            <div className="flex items-start gap-2">
                                                                <StickyNote className="w-5 h-5 text-main mt-1" />
                                                                <span className="text-sm italic">{order.note}</span>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {/* Order Total */}
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-sm text-gray-600 uppercase">{t('store.order-total')}</h4>
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-6 h-6 text-green-600" />
                                                    <span className="text-2xl font-bold text-green-600">{order.total}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="mb-4">
                                            <h4 className="font-semibold text-sm text-gray-600 uppercase mb-2">{t('store.order-items')}</h4>
                                            <div className="space-y-2">
                                                {Array.isArray(order.order) && order.order.map((item: any, index: number) => (
                                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                        <div className="flex items-center gap-3">
                                                            {item.image && (
                                                                <img src={item.image} alt={isArabic ? item.name_ar : item.name_en} className="w-12 h-12 object-cover rounded" />
                                                            )}
                                                            <div>
                                                                <p className="font-medium">{isArabic ? item.name_ar : item.name_en}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {t('store.quantity')}: {item.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="font-semibold">{parseFloat(item.price) * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        {order.status === 'pending' && (
                                            <div className="flex gap-2 pt-4 border-t">
                                                <Button
                                                    onClick={() => handleStatusChange(order.id, 'completed')}
                                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    {t('store.mark-completed')}
                                                </Button>
                                                <Button
                                                    onClick={() => handleStatusChange(order.id, 'cancelled')}
                                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                                                >
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    {t('store.mark-cancelled')}
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    )
}
