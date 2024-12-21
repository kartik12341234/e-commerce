"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const useremail = localStorage.getItem("loginid");
      try {
        const response = await axios.get(`/api/myorder/${useremail}`);
        const ordersWithImages = await Promise.all(
          response.data.map(async (order) => {
            try {
              const productId = order.productId;
              const productResponse = await axios.get(
                `api/admin/pro/${productId}`
              );
              return {
                ...order,
                productImage: productResponse.data.image,
              };
            } catch (error) {
              console.error(
                `Error fetching image for product ID ${order.productId}:`,
                error
              );
              return {
                ...order,
                productImage: null,
              };
            }
          })
        );
        setOrders(ordersWithImages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Orders</h1>
      <div style={styles.orderGrid}>
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <p style={styles.text}>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p style={styles.text}>
              <strong>Product:</strong> {order.product}
            </p>
            <p style={styles.text}>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p style={styles.text}>
              <strong>Amount:</strong> ₹{order.amount / 100}
            </p>
            {order.productImage && (
              <img
                src={order.productImage}
                alt={order.product}
                style={styles.productImage}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  orderGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  orderCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
  },
  orderCardHover: {
    transform: "scale(1.05)",
  },
  text: {
    margin: "10px 0",
    color: "#555",
  },
  productImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: "10px",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#555",
  },
};
