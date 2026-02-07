import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import { orderService } from '@/services/api';
import { Minus, Plus, Trash2, IndianRupee } from 'lucide-react';
import Header from '@/components/Header';

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { items, outletId } = useAppSelector((state) => state.cart);
    const user = useAppSelector((state) => state.auth.user);
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [orderType, setOrderType] = useState<'Quick' | 'Scheduled'>('Quick');
    const [scheduledTime, setScheduledTime] = useState('');
    const [loading, setLoading] = useState(false);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        if (!user || !outletId || items.length === 0 || !deliveryLocation) {
            alert('Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            await orderService.placeOrder({
                user_id: user.userId,
                outlet_id: outletId,
                order_type: orderType,
                scheduled_time: orderType === 'Scheduled' ? scheduledTime : undefined,
                delivery_location: deliveryLocation,
                items: items.map(item => ({ item_id: item.item_id, quantity: item.quantity })),
            });

            dispatch(clearCart());
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Cart is Empty</CardTitle>
                            <CardDescription>Add items from the menu to get started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => navigate('/')}>Browse Outlets</Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            <Header />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <Card key={item.item_id}>
                                <CardContent className="flex items-center justify-between p-4">
                                    <div>
                                        <h3 className="font-semibold">{item.item_name}</h3>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <IndianRupee className="h-3 w-3" />
                                            {item.price} × {item.quantity}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="icon" disabled>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button variant="outline" size="icon" disabled>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" disabled>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="orderType">Order Type</Label>
                                    <select
                                        id="orderType"
                                        className="w-full mt-1 p-2 border rounded-md"
                                        value={orderType}
                                        onChange={(e) => setOrderType(e.target.value as 'Quick' | 'Scheduled')}
                                    >
                                        <option value="Quick">Quick Order</option>
                                        <option value="Scheduled">Scheduled Order</option>
                                    </select>
                                </div>

                                {orderType === 'Scheduled' && (
                                    <div>
                                        <Label htmlFor="scheduledTime">Scheduled Time</Label>
                                        <Input
                                            id="scheduledTime"
                                            type="datetime-local"
                                            value={scheduledTime}
                                            onChange={(e) => setScheduledTime(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="deliveryLocation">Delivery Location</Label>
                                    <Input
                                        id="deliveryLocation"
                                        placeholder="e.g., Hostel A - Room 203"
                                        value={deliveryLocation}
                                        onChange={(e) => setDeliveryLocation(e.target.value)}
                                    />
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="flex items-center">
                                            <IndianRupee className="h-5 w-5" />
                                            {total}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={handlePlaceOrder}
                                    disabled={loading || !deliveryLocation}
                                >
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
