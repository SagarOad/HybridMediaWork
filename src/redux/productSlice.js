import { createSlice } from "@reduxjs/toolkit";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";

const initialState = {
  products: [
    {
      id: 1,
      name: "Sneakers",
      price: 65,
      imageUrl: product1,
    },
    {
      id: 2,
      name: "Sports Shoes",
      price: 45,
      imageUrl: product2,
    },
    {
      id: 3,
      name: "Sports Wear",
      price: 455,
      imageUrl: product3,
    },
    {
      id: 4,
      name: "Sports Shirt",
      price: 145,
      imageUrl: product4,
    },
    {
      id: 5, // Changed this ID to be unique
      name: "Sports Sneaker",
      price: 145,
      imageUrl: product5,
    },
  ],
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState, // Using the defined initialState variable here
  reducers: {
    // Loading items from local storage
    loadCartFromLocalStorage: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const cart = JSON.parse(localStorage.getItem(`cart_${user.email}`));
        if (cart) {
          state.cart = cart.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
        }
      }
    },

    // Update quantity for a cart item
    updateCartQuantity: (state, action) => {
      const { id, type } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        if (type === "increase") {
          existingItem.quantity += 1;
        } else if (type === "decrease" && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }
      // Save updated cart to localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.cart));
      }
    },
    // Remove item from the cart
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      // Save updated cart to localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.cart));
      }
    },
  },
});

export const {
  loadCartFromLocalStorage,
  updateCartQuantity,
  removeItemFromCart,
  clearCart,
} = productSlice.actions;

export default productSlice.reducer;
