import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, LogOut, ShoppingCart } from 'lucide-react';

export default function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const cartItems = useAppSelector((state) => state.cart.items);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!isAuthenticated) return null;

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <UtensilsCrossed className="h-8 w-8 text-orange-600" />
                        <span className="text-xl font-bold text-gray-900">Campus Dine</span>
                    </Link>

                    <nav className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            {user?.name} ({user?.role})
                        </span>

                        {(user?.role === 'Student' || user?.role === 'Faculty') && (
                            <Link to="/cart" className="relative">
                                <Button variant="ghost" size="icon">
                                    <ShoppingCart className="h-5 w-5" />
                                    {cartItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        )}

                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
