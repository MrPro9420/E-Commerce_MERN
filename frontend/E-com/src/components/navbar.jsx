import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  useEffect(() => {
    const handleLogin = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("authChanged", handleLogin);

    return () => {
      window.removeEventListener("authChanged", handleLogin);
    };
  }, []);

  useEffect(() => {
    const loadcart = async () => {
      if (!userId) return setCartCount(0);

      try {
        const response = await api.post(`/cart/${userId}`);
        if (response.status === 200) {
          setCartCount(
            response.data.cart.items.reduce(
              (acc, item) => acc + item.quantity,
              0,
            ),
          );
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.log("Error loading cart:", error);
      }
    };
    loadcart();
    window.addEventListener("cartUpdated", loadcart);
    return () => {
      window.removeEventListener("cartUpdated", loadcart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    setUserId(null);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link className="navbar-brand text-xl font-weight-bold" to="/">
        E-com
      </Link>
      <div className="flex gap-7 items-center">
        {userId && (
          <Link to="/cart" className="relative inline-block text-xl">
            <ShoppingCart className="w-6 h-6 text-white" />

            {cartCount > 0 && (
              <span
                className="
        absolute
        -top-2
        -right-4
        w-4
        h-4
        bg-red-600
        text-white
        text-xs
        rounded-full
        flex
        items-center
        justify-center
      "
              >
                {cartCount}
              </span>
            )}
          </Link>
        )}
        {!userId ? (
          <>
            <Link
              to="/login"
              className="  inline-block
    px-4 py-2
    border border-gray-500
    text-gray-500
    rounded-md
    font-medium
    transition-colors duration-200
    hover:bg-blue-500
    hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="  inline-block
    px-4 py-2
    border border-gray-500
    text-gray-500
    rounded-md
    font-medium
    transition-colors duration-200
    hover:bg-yellow-500
    hover:text-white"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <button
              className="  inline-block       
    px-4 py-2  rounded-md
    border border-gray-500
      transition-colors duration-200
    hover:bg-grey-800
    hover:text-white
    text-gray-500
    font-medium"
              onClick={() => navigate("/myorders/")}
            >
              MyOrders
            </button>
            <button
              className="  inline-block
    px-4 py-2
    border border-gray-500
    text-gray-500
    rounded-md
    font-medium
    transition-colors duration-200
    hover:bg-red-500
    hover:text-white"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
