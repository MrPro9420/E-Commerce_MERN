import { useParams } from "react-router";

const Order = () => {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow mt-5 ">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">
        Order Placed Successfully
      </h1>
      <p className="text-lg font-semibold text-gray-600">Order ID: {id}</p>
      <p className="mt-4 text-gray-700 font-semibold">
        Thank you for your purchase! Your order has been placed successfully.
      </p>
      <p className="text-gray-700 font-semibold mt-2">
        You can view your order details in the "My Orders" section of your
        account.
      </p>

      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 cursor-pointer"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Order;
