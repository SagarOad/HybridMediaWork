import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, loadCartFromLocalStorage } from "../redux/productSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainBanner from "../assets/mainBanner.png";
import SecondBanner from "../assets/secondBanner.png";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loadCartFromLocalStorage());
    }
  }, [dispatch]);

  const handleAddToCart = (product) => {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product exists, update the quantity
      existingProduct.quantity += 1;
    } else {
      // If it's a new product, add it to the cart with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show success message
    toast.success(`${product.name} has been added to your cart!`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-700">Mark Wood</h2>
          <p className="text-sm text-gray-500">marki@demo.com</p>
        </div>
        <nav className="mt-10">
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700 hover:text-white"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700 hover:text-white"
          >
            Products
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700 hover:text-white"
          >
            Notifications
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700 hover:text-white"
          >
            Analytics
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700 hover:text-white"
          >
            Inventory
          </a>
          <button
            href="#"
            className="block py-2.5 px-4 mt-10 text-red-500 border-t border-gray-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 text-gray-800">
        <div>
          <div className=" flex justify-end items-center">
            <button className=" bg-white font-medium p-2 text-[18px] flex justify-center items-center">
              <span>
                <FiShoppingCart size={22} className=" mr-2" />
              </span>
              My Cart
            </button>
          </div>
          <div className=" grid grid-cols-12">
            <div className=" col-span-8">
              <img
                src={MainBanner}
                className=" p-2 h-full w-full object-cover rounded-[40px]"
              />
            </div>
            <div className=" col-span-4">
              <img
                src={SecondBanner}
                className=" p-2 h-full w-full object-cover rounded-[40px]"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg ">
              <div className=" h-55">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-t-lg"
                />
              </div>
              <div className="flex flex-wrap justify-between mt-2">
                <button
                  className="bg-black flex-1 text-white text-[15px] font-semibold px-6 py-4"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </button>
                <button className="bg-[#89089f] flex-1 text-white text-[15px] font-semibold px-6 py-2">
                  QUICK VIEW
                </button>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h3 className="text-md font-bold">
                      {product.name.toUpperCase()}
                    </h3>
                  </div>
                  <div className="">
                    <span className=" font-bold text-lg flex items-center">
                      <FaHeart className="mr-1 text-[#89089f]" /> $
                      {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className=" text-md mt-1 font-medium italic">
                    {product.description || "Running"}
                  </p>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <AiFillStar key={index} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
