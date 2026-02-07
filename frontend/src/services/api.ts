import apiClient from '@/lib/apiClient';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: 'Student' | 'Faculty' | 'Staff' | 'Admin';
}

export interface AuthResponse {
    token: string;
    role: string;
}

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<{ message: string; userId: number }> => {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },
};

export interface Outlet {
    outlet_id: number;
    outlet_name: string;
    location: string;
    status: 'Open' | 'Closed';
}

export interface MenuItem {
    item_id: number;
    item_name: string;
    price: number;
    availability_status: boolean;
}

export const outletService = {
    getOutlets: async (): Promise<Outlet[]> => {
        const response = await apiClient.get('/outlets');
        return response.data;
    },

    getMenu: async (outletId: number): Promise<MenuItem[]> => {
        const response = await apiClient.get(`/outlets/${outletId}/menu`);
        return response.data;
    },

    updateMenuAvailability: async (itemId: number, availability: boolean): Promise<void> => {
        await apiClient.put(`/menu/${itemId}/availability`, { availability_status: availability });
    },
};

export interface OrderItem {
    item_id: number;
    quantity: number;
}

export interface PlaceOrderRequest {
    user_id: number;
    outlet_id: number;
    order_type: 'Quick' | 'Scheduled';
    scheduled_time?: string;
    delivery_location: string;
    items: OrderItem[];
}

export interface Order {
    order_id: number;
    outlet_name?: string;
    user_id?: number;
    delivery_location?: string;
    status: string;
    total_amount?: number;
    order_type?: string;
    scheduled_time?: string;
}

export const orderService = {
    placeOrder: async (data: PlaceOrderRequest): Promise<{ message: string; order_id: number; status: string }> => {
        const response = await apiClient.post('/orders/place', data);
        return response.data;
    },

    getUserOrders: async (userId: number): Promise<Order[]> => {
        const response = await apiClient.get(`/orders/user/${userId}`);
        return response.data;
    },

    getOutletOrders: async (outletId: number): Promise<Order[]> => {
        const response = await apiClient.get(`/orders/outlet/${outletId}`);
        return response.data;
    },

    acceptOrder: async (orderId: number): Promise<void> => {
        await apiClient.put(`/orders/${orderId}/accept`);
    },

    updateOrderStatus: async (orderId: number, status: string): Promise<void> => {
        await apiClient.put(`/orders/${orderId}/status`, { status });
    },
};
