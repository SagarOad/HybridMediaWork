import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AiFillHeart, AiFillStar } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-contain rounded-t-lg"
      />
      <div className="flex justify-between mt-2">
        <button
          className="bg-black text-white text-xs font-semibold px-6 py-2 rounded-md"
          onClick={() => dispatch(addToCart(product))}
        >
          ADD TO CART
        </button>
        <button className="bg-purple-700 text-white text-xs font-semibold px-6 py-2 rounded-md">
          QUICK VIEW
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-bold">{product.name.toUpperCase()}</h3>
        <p className="text-gray-400 text-sm mt-1">{product.description}</p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-purple-700 font-bold text-lg flex items-center">
          <AiFillHeart className="mr-1" /> ${product.price.toFixed(2)}
        </span>
        <div className="flex text-yellow-500">
          {Array(product.rating)
            .fill(0)
            .map((_, index) => (
              <AiFillStar key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
