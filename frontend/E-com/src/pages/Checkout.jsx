import { useState, useEffect } from "react";
import api from "../api/axios";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const loadAddressAndCart = async () => {
      try {
        const addressResponse = await api.get(`/address/${userId}`);
        setAddress(addressResponse.data.address);
        const cartResponse = await api.post(`/cart/${userId}`);
        setCart(cartResponse.data.cart);
      } catch (error) {
        console.error("Error fetching address or cart:", error);
      }
    };
    loadAddressAndCart();
  }, []);

  if (!cart) return <div>Loading...</div>;

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="font-semibold mb-2">Select Address</h2>
      {address.map((addr) => (
        <div key={addr._id} className="border p-4 rounded mb-4">
          <p>{addr.fullname}</p>
          <p>
            {addr.addressline}, {addr.city}, {addr.state} ,{addr.pincode}
          </p>
        </div>
      ))}

      <h2 className="font-semibold mb-2">Order Summary</h2>
      <div className="border p-4 rounded mb-4">
        <p>Total Price: Rs. {totalPrice.toFixed(2)}</p>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
        Place Order (COD)
      </button>
    </div>
  );
};

export default Checkout;
