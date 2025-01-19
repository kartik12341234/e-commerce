"use client";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  let useremail;
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  if (typeof window !== "undefined") {
    useremail = localStorage.getItem("loginid");
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/mycart/${useremail}`);
        const data = await response.json();
        if (response.ok) {
          setCartItems(data);
        } else {
          console.error("Failed to fetch cart items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [useremail]);

  const handleBuy = (productId) => {
    router.push(`/product/${productId}`);
  };

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
              <button
                onClick={() => router.push("/allproduct")}
                style={{
                  display: "none",
                }}
              ></button>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "60px",
                }}
              >
                <div
                  className="imgs"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Image
                    src={item.imageUrl}
                    width={90}
                    height={60}
                    alt={item.productName}
                  />
                </div>
                <div className="hikdj">
                  <h3>{item.productName}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: 1</p>
                  <button
                    onClick={() => handleBuy(item.productId)}
                    style={{
                      backgroundColor: "#034",
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
              </div>
            )}
          </div>
        ))
      )}
      <div>
        {guestCart.length > 0 ? (
          guestCart.map((item, index) => (
            <div key={index} className="cart-tem" style={{ display: "flex" }}>
              <div
                className="ims"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Image
                  src={item.imageUrl}
                  width={90}
                  height={60}
                  alt={item.productName}
                />
              </div>
              <div className="hikj">
                <h3>{item.productName}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: 1</p>
                <button
                  onClick={() => handleBuy(item.productId)}
                  className="buy-button"
                >
                  Buy now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your guest cart is empty.</p>
        )}
      </div>
      <style jsx>{`
        .cart-container {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }
        .cart-item {
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .cart-tem {
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          width: 100%;
          max-width: 340px;
          text-align: center;
        }
        .cart-item h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        .buy-button {
          background-color: #034;
          color: white;
          margin-top: 20px;
          border-radius: 8px;
          margin-left: 20px;
          width: 200px;
          height: 40px;
          align-self: center;
        }
      `}</style>
      <h1>Have an account?</h1>
      <p onClick={() => router.push("/login")} style={{ cursor: "pointer" }}>
        <span style={{ color: "blue", textDecoration: "underline" }}>
          Login
        </span>{" "}
        to checkout faster!
      </p>
    </div>
  );
};

export default Page;
