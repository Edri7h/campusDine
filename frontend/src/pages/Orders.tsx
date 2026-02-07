import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { orderService } from '@/services/api';
import type { Order } from '@/services/api';
import { useAppSelector } from '@/store/hooks';
import { Clock, MapPin, IndianRupee } from 'lucide-react';
import Header from '@/components/Header';

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (user) {
            loadOrders();
        }
    }, [user]);

    const loadOrders = async () => {
        if (!user) return;

        try {
            const data = await orderService.getUserOrders(user.userId);
            setOrders(data);
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoading(false);
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

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>No Orders Yet</CardTitle>
                            <CardDescription>Your order history will appear here</CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.order_id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">Order #{order.order_id}</CardTitle>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <CardDescription>{order.outlet_name}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        {order.delivery_location && (
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                {order.delivery_location}
                                            </div>
                                        )}
                                        {order.total_amount && (
                                            <div className="flex items-center text-gray-900 font-semibold">
                                                <IndianRupee className="h-4 w-4 mr-1" />
                                                {order.total_amount}
                                            </div>
                                        )}
                                        {order.order_type && (
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {order.order_type} Order
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
