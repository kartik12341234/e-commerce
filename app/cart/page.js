"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch cart items from the API
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/id/cart"); // Replace with your API endpoint
        const data = await response.json();

        if (response.ok) {
          setCartItems(data); // Set cart items if data is returned
        } else {
          console.error("Failed to fetch cart items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetch
      }
    };

    fetchCartItems();
  }, []);

  // Determine what to display
  const itemsToDisplay = cartItems.length === 0 ? ["0 items"] : cartItems;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        itemsToDisplay.map((item, index) => (
          <div className="cart-item" key={index}>
            {typeof item === "string" ? (
              <p className="empty-cart">{item}</p> // For "0 items"
            ) : (
              <>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </>
            )}
          </div>
        ))
      )}
      <style jsx>{`
        .cart-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f9;
          min-height: 100vh;
        }
        .cart-title {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #333;
        }
        .cart-item {
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          width: 100%;
          max-width: 600px;
          text-align: center;
        }
        .cart-item h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #555;
        }
        .cart-item p {
          margin: 0.5rem 0 0;
          font-size: 1rem;
          color: #777;
        }
        .empty-cart {
          font-size: 1.2rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default Page;
