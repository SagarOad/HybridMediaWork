import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCartFromLocalStorage,
  updateCartQuantity,
  removeItemFromCart,
} from "../redux/productSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.products.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cartItems]);

  // Handle quantity change (increment or decrement)
  const handleQuantityChange = (id, type) => {
    dispatch(updateCartQuantity({ id, type })); // Dispatch action to update quantity
  };

  // Handle removing item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id)); // Dispatch action to remove the item
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-10 bg-gray-100 min-h-screen">
      {/* Cart Items Section */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
        <p className="text-gray-600 mb-4">
          You have {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in
          your cart
        </p>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-4 p-4 border-b"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-500">Running</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                >
                  <FiChevronDown size={18} />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                >
                  <FiChevronUp size={18} />
                </button>
              </div>
              <span className="text-lg font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button onClick={() => handleRemoveItem(item.id)}>
                <AiOutlineDelete size={24} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Card Details Section */}
      <div className="w-full lg:w-96 bg-purple-800 text-white p-6 rounded-lg shadow-md mt-10 lg:mt-0 lg:ml-10">
        <h3 className="text-2xl font-semibold mb-4">Card Details</h3>
        <div className="space-y-4">
          {/* Card type icons */}
          <div className="flex space-x-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className=" w-14 h-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="w-14 h-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Rupay-Logo.png"
              alt="RuPay"
              className="w-14 h-10"
            />
          </div>

          {/* Name on card */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name on card
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full mt-1 p-2 rounded-md text-gray-800"
            />
          </div>

          {/* Card Number */}
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              name="card-number"
              placeholder="1111 2222 3333 4444"
              className="w-full mt-1 p-2 rounded-md text-gray-800"
            />
          </div>

          {/* Expiration and CVV */}
          <div className="flex space-x-3">
            <div>
              <label htmlFor="exp-date" className="block text-sm font-medium">
                Expiration Date
              </label>
              <input
                type="text"
                id="exp-date"
                name="exp-date"
                placeholder="mm/yy"
                className="w-full mt-1 p-2 rounded-md text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                className="w-full mt-1 p-2 rounded-md text-gray-800"
              />
            </div>
          </div>

          {/* Price Details */}
          <div className="mt-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$4.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Total (Tax incl.)</span>
              <span>${(total + 4).toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg font-semibold text-lg">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
