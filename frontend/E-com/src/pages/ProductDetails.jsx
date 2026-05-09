import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    loadProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="w-80 h-80 bg-gray-100 flex items-center justify-center my-4 hover:shadow-lg transition-shadow rounded">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-w-full max-h-full object-contain p-2"
        />
      </div>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-gray-800 font-bold text-xl">${product.price}</p>

      <button className="bg-blue-500 text-white my-4 py-2 px-4 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
