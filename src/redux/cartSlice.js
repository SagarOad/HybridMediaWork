import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Cart items stored here
    totalQuantity: 0, // To track total quantity in cart
  },
  reducers: {
    loadCartFromLocalStorage(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
        state.items = savedCart;
        state.totalQuantity = savedCart.reduce((total, item) => total + item.quantity, 0);
      }
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
        state.totalQuantity++;
      } else {
        existingItem.quantity++;
      }
      // Sync to localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
      // Sync to localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        localStorage.removeItem(`cart_${user.email}`);
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, loadCartFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
