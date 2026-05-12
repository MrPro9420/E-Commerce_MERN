import { useEffect, useState } from "react";
import api from "../api/axios";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await api.get(`/order/userorders/${userId}`);
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  if (orders.length === 0) {
    return <div className="p-4">No orders found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 m-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
          <p className="mb-2 font-semibold">
            Total Price: ${order.totalPrice.toFixed(2)}
          </p>
          <p className="mb-2 font-semibold">
            Status:{" "}
            {order.status === "Pending"
              ? "Order Placed !"
              : order.status === "Shipped"
                ? " Order Shipped"
                : order.status === "Delivered"
                  ? "Order Delivered"
                  : "Order Cancelled"}
          </p>
          <h4 className="font-semibold mb-1">Items:</h4>
          <ul className="list-decimal list-inside ml-3">
            {order.items.map((item) => (
              <li key={item._id} className="mb-1">
                {item.productId.title} - Quantity: {item.quantity} - Price: $
                {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Myorders;
