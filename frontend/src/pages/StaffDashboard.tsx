import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { orderService } from '@/services/api';
import type { Order } from '@/services/api';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import Header from '@/components/Header';

export default function StaffDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const outletId = 1; // TODO: Get from user context

    useEffect(() => {
        loadOrders();
        const interval = setInterval(loadOrders, 10000); // Refresh every 10 seconds
        return () => clearInterval(interval);
    }, []);

    const loadOrders = async () => {
        try {
            const data = await orderService.getOutletOrders(outletId);
            setOrders(data);
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptOrder = async (orderId: number) => {
        try {
            await orderService.acceptOrder(orderId);
            loadOrders();
        } catch (error) {
            console.error('Failed to accept order:', error);
        }
    };

    const handleUpdateStatus = async (orderId: number, status: string) => {
        try {
            await orderService.updateOrderStatus(orderId, status);
            loadOrders();
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            Placed: 'bg-blue-100 text-blue-800',
            Accepted: 'bg-green-100 text-green-800',
            Preparing: 'bg-yellow-100 text-yellow-800',
            OutForDelivery: 'bg-purple-100 text-purple-800',
            Delivered: 'bg-gray-100 text-gray-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Management</h1>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>No Orders</CardTitle>
                            <CardDescription>New orders will appear here</CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <Card key={order.order_id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">Order #{order.order_id}</CardTitle>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <CardDescription>
                                        {order.delivery_location}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {order.status === 'Placed' && (
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => handleAcceptOrder(order.order_id)}
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Accept
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="flex-1"
                                            >
                                                <XCircle className="h-4 w-4 mr-1" />
                                                Reject
                                            </Button>
                                        </div>
                                    )}

                                    {order.status === 'Accepted' && (
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleUpdateStatus(order.order_id, 'Preparing')}
                                        >
                                            <Clock className="h-4 w-4 mr-1" />
                                            Start Preparing
                                        </Button>
                                    )}

                                    {order.status === 'Preparing' && (
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleUpdateStatus(order.order_id, 'OutForDelivery')}
                                        >
                                            Out for Delivery
                                        </Button>
                                    )}

                                    {order.status === 'OutForDelivery' && (
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleUpdateStatus(order.order_id, 'Delivered')}
                                        >
                                            Mark as Delivered
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
