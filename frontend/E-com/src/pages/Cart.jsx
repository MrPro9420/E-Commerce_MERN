/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    if (!userId) return setCart(null);
    try {
      const response = await api.post(`/cart/${userId}`);
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  const removeItem = async (productId) => {
    try {
      await api.post("/cart/remove", { userId, productId });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity === 0) {
      return removeItem(productId);
    }
    try {
      await api.post("/cart/update", { userId, productId, quantity });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  if (!cart) {
    return <div className="container mt-4">Your cart is empty.</div>;
  }
  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="border py-4 px-6 mb-4 rounded-lg flex  items-center gap-8"
            >
              <h2 className="text-lg font-semibold">{item.productId.title}</h2>
              <img
                src={item.productId.imageUrl}
                alt={item.productId.title}
                className="w-32 h-32 object-cover my-2"
              />
              <p className="text-gray-600">
                ${item.productId.price.toFixed(2)}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    updateQuantity(item.productId._id, item.quantity - 1)
                  }
                  className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId._id, item.quantity + 1)
                  }
                  className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-md font-medium transition-colors duration-200 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full  text-white bg-blue-500  my-2 p-2 rounded"
          >
            Proceed to checkout
          </button>
        </div>
      )}
    </div>
  );
};
export default Cart;
