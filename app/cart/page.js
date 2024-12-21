"use client";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  if (typeof window !== "undefined") {
    useremail = localStorage.getItem("loginid");
  }

  useEffect(() => {
    // Fetch cart items from the API
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/mycart/${useremail}`); // Replace with your API endpoint
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
  const itemsToDisplay =
    cartItems.length === 0 ? ["Your cart looks empty"] : cartItems;

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? <p>Your cart is empty</p> : <p>Your cart</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        itemsToDisplay.map((item, index) => (
          <div className="cart-item" key={index}>
            {typeof item === "string" ? (
              <>
                {" "}
                <button
                  onClick={() => router.push("/allproduct")}
                  style={{
                    width: "200px",
                    height: "40px",
                    marginTop: "20px",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "8px",
                  }}
                >
                  {" "}
                  Continue Shopping
                </button>
              </>
            ) : (
              <>
                <h3>{item.productName}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: 1</p>
              </>
            )}
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                marginTop: "20px",
                borderRadius: "8px",
                width: "200px",
                height: "40px",
              }}
            >
              Buy now
            </button>
          </div>
        ))
      )}
      <style jsx>{`
        .cart-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;

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
      <>
        <h1>have an account ?</h1>
        <p onClick={() => router.push("/login")} style={{ cursor: "pointer" }}>
          <span style={{ color: "blue", textDecoration: "underline" }}>
            Login
          </span>{" "}
          to checkout faster !{" "}
        </p>
      </>
    </div>
  );
};

export default Page;
