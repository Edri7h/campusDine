import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { outletService } from '@/services/api';
import type { Outlet } from '@/services/api';
import { Store, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';

export default function Dashboard() {
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOutlets();
    }, []);

    const loadOutlets = async () => {
        try {
            const data = await outletService.getOutlets();
            setOutlets(data);
        } catch (error) {
            console.error('Failed to load outlets:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Outlets</h1>
                    <p className="text-gray-600">Choose an outlet to browse the menu and place your order</p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {outlets.map((outlet) => (
                            <Card key={outlet.outlet_id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Store className="h-5 w-5 text-orange-600" />
                                            <CardTitle>{outlet.outlet_name}</CardTitle>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${outlet.status === 'Open'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {outlet.status}
                                        </span>
                                    </div>
                                    <CardDescription className="flex items-center mt-2">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {outlet.location}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link to={`/outlet/${outlet.outlet_id}`}>
                                        <Button className="w-full" disabled={outlet.status === 'Closed'}>
                                            <Clock className="h-4 w-4 mr-2" />
                                            View Menu
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <Link to="/orders">
                        <Button variant="outline" size="lg">
                            View My Orders
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
