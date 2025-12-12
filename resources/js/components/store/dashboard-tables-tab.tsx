import React, { useState } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import {
    Plus,
    Edit,
    Trash2,
    QrCode,
    Users,
    Printer,
    Eye,
} from 'lucide-react'
import { router } from '@inertiajs/react'
import TableDialog from './table-dialog'
import QRCodeViewModal from './qr-code-view-modal'

interface Table {
    id: number
    store_id: number
    name: string
    capacity: number
    qr_code: string | null
    created_at: string
    updated_at: string
}

export default function DashboardTablesTab({ store, tables }: { store: any; tables: Table[] }) {
    const { t } = useTranslation()
    const [showDialog, setShowDialog] = useState(false)
    const [selectedTable, setSelectedTable] = useState<Table | null>(null)
    const [showQRModal, setShowQRModal] = useState(false)
    const [qrTable, setQrTable] = useState<Table | null>(null)

    const handleAddTable = () => {
        setSelectedTable(null)
        setShowDialog(true)
    }

    const handleEditTable = (table: Table) => {
        setSelectedTable(table)
        setShowDialog(true)
    }

    const handleDeleteTable = (tableId: number) => {
        if (confirm(t('store.confirm-delete-table'))) {
            router.delete(route('store.table.delete', tableId), {
                onSuccess: () => {
                    console.log('Table deleted successfully')
                },
                onError: (errors) => {
                    console.error('Failed to delete table:', errors)
                }
            })
        }
    }

    const handleViewQR = (table: Table) => {
        setQrTable(table)
        setShowQRModal(true)
    }

    const handlePrintQR = (table: Table) => {
        const printWindow = window.open('', '', 'height=600,width=800')
        if (printWindow && table.qr_code) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${t('store.print-qr-code')} - ${table.name}</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                padding: 40px;
                                text-align: center;
                            }
                            h1 {
                                margin-bottom: 10px;
                                font-size: 32px;
                            }
                            h2 {
                                color: #666;
                                margin-bottom: 30px;
                                font-size: 24px;
                            }
                            img {
                                max-width: 400px;
                                border: 4px solid #333;
                                border-radius: 10px;
                                margin-bottom: 20px;
                            }
                            p {
                                font-size: 18px;
                                color: #888;
                            }
                            @media print {
                                body {
                                    padding: 0;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${store.name}</h1>
                        <h2>${table.name}</h2>
                        <img src="${table.qr_code}" alt="${table.name} QR Code" />
                        <p>${t('store.scan-to-order')}</p>
                    </body>
                </html>
            `)
            printWindow.document.close()
            setTimeout(() => {
                printWindow.print()
            }, 500)
        }
    }

    const handleDownloadQR = (table: Table) => {
        if (table.qr_code) {
            const link = document.createElement('a')
            link.href = table.qr_code
            link.download = `${table.name}_QR_Code.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleViewTable = (table: Table) => {
        const url = route('store.home', {
            store_name: store.name,
            store_id: store.id,
            table: table.id
        })
        window.open(url, '_blank')
    }

    return (
        <TabsContent value="tables" className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">{t('store.tables')}</CardTitle>
                            <CardDescription className='mt-2'>{t('store.manage-tables')}</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-lg px-4 py-2">
                                {tables?.length || 0} {t('store.tables-count')}
                            </Badge>
                            <Button
                                onClick={handleAddTable}
                                className="bg-main hover:bg-second"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                {t('store.add-table')}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {!tables || tables.length === 0 ? (
                        <div className="text-center py-12">
                            <QrCode className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg mb-4">{t('store.no-tables')}</p>
                            <Button
                                onClick={handleAddTable}
                                className="bg-main hover:bg-second"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                {t('store.add-first-table')}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tables.map((table) => (
                                <Card key={table.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="bg-gradient-to-r from-main to-second p-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-xl">{table.name}</h3>
                                            <Badge className="bg-white text-main">
                                                <Users className="w-4 h-4 mr-1" />
                                                {table.capacity}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <CardContent className="p-4">
                                        {table.qr_code ? (
                                            <div className="mb-4">
                                                <div className="bg-white p-3 rounded border-2 border-gray-200 flex items-center justify-center">
                                                    <img 
                                                        src={table.qr_code} 
                                                        alt={`${table.name} QR Code`}
                                                        className="w-32 h-32 object-contain"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mb-4 text-center py-8 bg-gray-50 rounded">
                                                <QrCode className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                                                <p className="text-sm text-gray-500">{t('store.generating-qr')}</p>
                                            </div>
                                        )}
                                        
                                        <div className="space-y-2">
                                            {table.qr_code && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button
                                                        onClick={() => handleViewQR(table)}
                                                        size="sm"
                                                        className="bg-blue-500 hover:bg-blue-600 text-white"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        {t('store.view-qr')}
                                                    </Button>
                                                    <Button
                                                        onClick={() => handlePrintQR(table)}
                                                        size="sm"
                                                        className="bg-green-500 hover:bg-green-600 text-white"
                                                    >
                                                        <Printer className="w-4 h-4 mr-1" />
                                                        {t('store.print-qr')}
                                                    </Button>
                                                </div>
                                            )}
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button
                                                    onClick={() => handleEditTable(table)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    <Edit className="w-4 h-4 mr-1" />
                                                    {t('store.edit')}
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteTable(table.id)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    {t('store.delete')}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {showDialog && (
                <TableDialog 
                    table={selectedTable}
                    onClose={() => {
                        setShowDialog(false)
                        setSelectedTable(null)
                    }}
                />
            )}

            {showQRModal && qrTable && (
                <QRCodeViewModal
                    table={qrTable}
                    store={store}
                    onClose={() => {
                        setShowQRModal(false)
                        setQrTable(null)
                    }}
                />
            )}
        </TabsContent>
    )
}
