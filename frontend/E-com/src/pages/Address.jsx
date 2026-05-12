import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const Address = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    addressline: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    if (
      !form.fullname ||
      !form.phone ||
      !form.addressline ||
      !form.city ||
      !form.state ||
      !form.pincode ||
      !form.country
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      await api.post("/address/add", { ...form, userId });
      navigate("/checkout");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Delivery Address</h1>
      <form onSubmit={saveAddress}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            value={form[key]}
            onChange={handleChange}
            className=" w-full p-2 border border-gray-500 rounded mb-4"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full p-2 rounded bg-blue-500 text-white"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;
