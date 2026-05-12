import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAddressAndCart = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }
      try {
        const addressResponse = await api.get(`/address/${userId}`);
        setAddress(addressResponse.data.addresses);
        setSelectedAddress(
          addressResponse.data.addresses.length > 0
            ? addressResponse.data.addresses[0]
            : null,
        );
        const cartResponse = await api.post(`/cart/${userId}`);
        setCart(cartResponse.data.cart);
      } catch (error) {
        console.error("Error fetching address or cart:", error);
      }
    };
    loadAddressAndCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!cart) return <div>Loading...</div>;

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    // Implement order placement logic here (e.g., API call to create order)
    if (!selectedAddress) {
      alert("Please select an address before placing the order.");
      return;
    }
    try {
      const res = await api.post("/order/placeorder", {
        userId,
        addressId: selectedAddress._id,
      });

      if (res.status === 201) {
        alert("Order placed successfully!");
        setCart(null); // Clear cart after successful order
        navigate("/orders/" + res.data.orderId);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-2 text-2xl">Select Address</h2>
        <button
          onClick={() => {
            navigate("/address");
          }}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        >
          Add New Address
        </button>
      </div>
      {address && address.length > 0 ? (
        address.map((addr) => (
          <div key={addr._id} className="border p-4 rounded mb-4">
            <label htmlFor="address" key={addr._id}>
              <input
                type="radio"
                name="address"
                value={addr._id}
                checked={selectedAddress?._id === addr._id}
                onChange={() => setSelectedAddress(addr)}
              />
              <span>{addr.fullname}</span>
              <p>
                {addr.addressline}, {addr.city}, {addr.state}-{addr.pincode},{" "}
                {addr.country}
              </p>
              <p>Phone: {addr.phone}</p>
            </label>
          </div>
        ))
      ) : (
        <div className="border p-4 rounded mb-4">
          <p className="text-gray-500">
            No address selected. Please add an address.
          </p>
        </div>
      )}

      <h2 className="font-semibold mb-2">Order Summary</h2>
      <div className="border p-4 rounded mb-4">
        <p>Total Price: Rs. {totalPrice.toFixed(2)}</p>
      </div>
      <button
        onClick={placeOrder}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 cursor-pointer"
      >
        Place Order (COD)
      </button>
    </div>
  );
};

export default Checkout;
