import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { outletService } from '@/services/api';
import type { MenuItem } from '@/services/api';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';
import { Plus, IndianRupee } from 'lucide-react';
import Header from '@/components/Header';

export default function OutletMenu() {
    const { outletId } = useParams<{ outletId: string }>();
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (outletId) {
            loadMenu(parseInt(outletId));
        }
    }, [outletId]);

    const loadMenu = async (id: number) => {
        try {
            const data = await outletService.getMenu(id);
            setMenu(data);
        } catch (error) {
            console.error('Failed to load menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (item: MenuItem) => {
        if (outletId) {
            dispatch(addToCart({ item, outletId: parseInt(outletId) }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu</h1>
                    <p className="text-gray-600">Add items to your cart and proceed to checkout</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menu.map((item) => (
                            <Card key={item.item_id} className={!item.availability_status ? 'opacity-60' : ''}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{item.item_name}</span>
                                        <span className="flex items-center text-orange-600">
                                            <IndianRupee className="h-4 w-4" />
                                            {item.price}
                                        </span>
                                    </CardTitle>
                                    <CardDescription>
                                        {item.availability_status ? (
                                            <span className="text-green-600 font-medium">Available</span>
                                        ) : (
                                            <span className="text-red-600 font-medium">Not Available</span>
                                        )}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        className="w-full"
                                        onClick={() => handleAddToCart(item)}
                                        disabled={!item.availability_status}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
