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
      id: 4,
      name: "Sports Sneaker",
      price: 145,
      imageUrl: product5,
    },
  ],
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return; // Do nothing if no user is logged in

      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
      } else {
        state.cart.push({ ...action.payload, quantity: 1 }); // Add new item
      }
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.cart));
    },
    loadCartFromLocalStorage: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const cart = JSON.parse(localStorage.getItem(`cart_${user.email}`));
        if (cart) {
          state.cart = cart; // Load user-specific cart
        }
      }
    },
  },
});

export const { addToCart, loadCartFromLocalStorage } = productSlice.actions;
export default productSlice.reducer;
