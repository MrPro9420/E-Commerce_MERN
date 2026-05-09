import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get(
          `/product?search=${searchTerm}&category=${categories}`,
        );
        setProducts(response.data.allProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, [searchTerm, categories]);

  const addtocart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const res = await api.post("/cart/add", {
        userId,
        productId,
      });
      const totalItems = res.data.cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      localStorage.setItem("cartCount", totalItems);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div className="p-6">
        <div className="mb-4 flex gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <select
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div className="border border-gray-300 rounded p-4 hover:shadow-lg transition-shadow">
            <Link to={`/product/${product._id}`} key={product._id}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-800 font-bold">${product.price}</p>
            </Link>
            <button
              onClick={() => addtocart(product._id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
