import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: "",
  });

  const [msg, setmsg] = useState("");

  const navigate = useNavigate();

  const handlechange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/product/", form);
      //   console.log(res);
      alert("Product added successfully");
      setmsg(res?.data?.message);
      navigate("/admin/products");
    } catch (error) {
      setmsg(
        error.response?.data?.message || "An error occurred in adding product",
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      {msg && (
        <div className="mb-4 text-center text-sm text-blue-600 font-medium">
          {msg}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handlesubmit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handlechange}
            placeholder={`Enter ${key}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focuse:outline-none focuse:ring-2 focuse:ring-blue-500"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
