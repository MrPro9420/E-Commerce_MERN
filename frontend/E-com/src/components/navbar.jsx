import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const loadcart = async () => {
      if (!userId) return setCartCount(0);

      try {
        const response = await api.get(`/cart/${userId}`);
        setCartCount(
          response.data.cart.items.reduce(
            (acc, item) => acc + item.quantity,
            0,
          ),
        );
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    loadcart();
    window.addEventListener("cartUpdated", loadcart);
    return () => {
      window.removeEventListener("cartUpdated", loadcart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link className="navbar-brand text-xl font-weight-bold" to="/">
        E-com
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/cart" className="relative text-xl">
          Cart
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-danger text-white rounded-circle py-1 px-2">
              {cartCount}
            </span>
          )}
        </Link>
        {!userId ? (
          <>
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline-secondary">
              Signup
            </Link>
          </>
        ) : (
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
