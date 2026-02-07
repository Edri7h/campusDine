import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MenuItem } from '@/services/api';

interface CartItem extends MenuItem {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    outletId: number | null;
}

const initialState: CartState = {
    items: [],
    outletId: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ item: MenuItem; outletId: number }>) => {
            if (state.outletId && state.outletId !== action.payload.outletId) {
                // Clear cart if switching outlets
                state.items = [];
            }
            state.outletId = action.payload.outletId;

            const existingItem = state.items.find(i => i.item_id === action.payload.item.item_id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload.item, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.item_id !== action.payload);
            if (state.items.length === 0) {
                state.outletId = null;
            }
        },
        updateQuantity: (state, action: PayloadAction<{ itemId: number; quantity: number }>) => {
            const item = state.items.find(i => i.item_id === action.payload.itemId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.outletId = null;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
