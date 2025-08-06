import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const Thankyou = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/order/get`, {
       withCredentials : true
      });
      console.log("Order data : ", res.data);
      
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="text-success">🎉 Thank You for Your Order!</h2>
        <p>Your order has been placed successfully.</p>
      </div>

      <h2 className="mb-3 fw-bold text-secondary">Your Recent Orders</h2>
      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>No recent orders found.</p>
      ) : (
        <div className="list-group">
          {orders.map((order, idx) => (
            <div key={order._id || idx} className="list-group-item mb-4 shadow-sm p-3 bg-success text-white">
              <p><strong>Address:</strong> {order.address}  </p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount || "0.00"}</p>
              <h5 className="mt-4 mb-2">Products:</h5>
              {order.orderItems?.map((product, i) => (
                <div key={i} className="d-flex align-items-center mb-3 border rounded p-2">
                  <div>
                    <p className="mb-1"><strong>{product.name}</strong></p>
                    <p className="mb-0">Price: ₹{product.price} × {product.qty} = ₹{product.price * product.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thankyou;
