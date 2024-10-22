import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCartFromLocalStorage } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainBanner from "../assets/mainBanner.png";
import SecondBanner from "../assets/secondBanner.png";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";

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
    dispatch(addToCart(product));
    toast.success(`${product.name} has been added to your cart!`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="flex-1 p-4 lg:p-10 text-gray-800">
        {/* Cart Button */}
        <div className="flex justify-end items-center mb-4">
          <NavLink
            to="/cart"
            className="bg-white font-medium p-2 text-[18px] flex justify-center items-center"
          >
            <FiShoppingCart size={22} className="mr-2" />
            My Cart
          </NavLink>
        </div>

        {/* Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <img
              src={MainBanner}
              alt="Main Banner"
              className="p-2 w-full h-auto object-cover rounded-[40px]"
            />
          </div>
          <div className="lg:col-span-4">
            <img
              src={SecondBanner}
              alt="Second Banner"
              className="p-2 w-full h-auto object-cover rounded-[40px]"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg">
              <div className="h-55">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-t-lg"
                />
              </div>
              <div className="flex flex-wrap justify-between mt-2">
                <button
                  className="bg-black flex-1 text-white text-[14px] font-semibold px-6 py-3 md:py-4 rounded-bl-lg"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </button>
                <button className="bg-[#89089f] flex-1 text-white text-[15px] font-semibold px-6 py-3 md:py-4 rounded-br-lg">
                  QUICK VIEW
                </button>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-bold">
                    {product.name.toUpperCase()}
                  </h3>
                  <span className="font-bold text-lg flex items-center">
                    <FaHeart className="mr-1 text-[#89089f]" /> $
                    {product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-md mt-1 font-medium italic">
                    {product.description || "Running"}
                  </p>
                  <div className="flex text-yellow-500">
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
