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
  let guestCart = [];

  if (typeof window !== "undefined") {
    guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    useremail = localStorage.getItem("loginid");
  }
  const calculateTotal = () => {
    return [...cartItems, ...guestCart].reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  // Placeholder values for summary
  const orderTotal = calculateTotal();
  const totalItems = cartItems.length + guestCart.length;
  const toPay = orderTotal;
  const itemsDiscount = 31;
  const shipping = 49;
  const shippingFree = true;
  const prepaidDiscount = 43;
  const savings = itemsDiscount + prepaidDiscount + (shippingFree ? shipping : 0);

  const offers = [
    {
      title: "Flat 15% off",
      code: "NEWME15",
      condition: "Minimum purchase of ₹599",
    },
    {
      title: "Buy 3 Get 8% off",
      code: "BUY3",
      condition: "Minimum purchase of 3 items",
    },
    {
      title: "Buy 3, Pay For 2",
      code: "B2G1",
      condition: "On selected items",
    },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    // Optional: Add toast notification here
  };

  const handleBuy = (productId) => {
    router.push(`/product/${productId}`);
  };

  const itemsToDisplay =
    cartItems.length === 0 ? ["Your cart looks empty"] : cartItems;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      <div className="w-full max-w-3xl mx-auto mb-6">
        <h2 className="text-lg font-semibold mb-3">
          Available offers for you ({offers.length})
        </h2>

        <div
          className="flex overflow-x-auto gap-4 pb-4 no-scrollbar"
          style={{ backgroundColor: "fff8f1" }}
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64  rounded-lg border border-gray-200 p-4"
              style={{ backgroundColor: "#fff8f1" }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {offer.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{offer.condition}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded px-3 py-2 text-sm font-mono">
                  {offer.code}
                </div>
                <button
                  onClick={() => copyCode(offer.code)}
                  className="px-3 py-2 bg-green-800 text-white text-sm rounded hover:bg-green-700 transition-colors"
                >
                  COPY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              <div className="item-layout">
                <div className="img-container">
                  <Image
                    src={item.imageUrl}
                    width={90}
                    height={90}
                    alt={item.productName}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  <p className="price">₹{item.price}</p>
                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => handleBuy(item.productId)}
                    >
                      -
                    </button>
                    <span>1</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleBuy(item.productId)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleBuy(item.productId)}
                    className="buy-now-btn"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      <div className="guest-cart">
        {guestCart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-layout">
              <div className="img-container">
                <Image
                  src={item.imageUrl}
                  width={90}
                  height={90}
                  alt={item.productName}
                />
              </div>
              <div className="item-details">
                <h3>{item.productName}</h3>
                <p className="price">₹{item.price}</p>
                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() => handleBuy(item.productId)}
                  >
                    -
                  </button>
                  <span>1</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleBuy(item.productId)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleBuy(item.productId)}
                  className="buy-now-btn"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {(cartItems.length > 0 || guestCart.length > 0) && (
        <div className="cart-summary">
          <div className="total clickable" onClick={() => setShowSummary(v => !v)}>
            <span style={{fontWeight: 700, fontSize: '2rem'}}>₹{calculateTotal().toLocaleString()}</span>
            <span style={{fontSize: '1.5rem', marginLeft: 4, cursor: 'pointer'}}>{showSummary ? '▲' : '▼'}</span>
          </div>
          <div style={{flex: '0 0 60px'}}></div>
          <button className="checkout-btn">Continue</button>
          {showSummary && (
            <div className="price-summary-dropdown">
              <div className="summary-row"><span>Total Items</span><span>{totalItems}</span></div>
              <div className="summary-row"><span>Total Price</span><span>₹{orderTotal}</span></div>
              <div className="summary-row total-pay"><span>To Pay</span><span>₹{toPay}</span></div>
            </div>
          )}
        </div>
      )}

      <div className="login-section">
        <h2>Have an account?</h2>
        <p onClick={() => router.push("/login")} className="login-text">
          <span>Login</span> to checkout faster!
        </p>
      </div>

      <style jsx>{`
        .cart-container {
          padding: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .cart-summary {
          position: fixed;
          width: 100%;
          display: flex;
          gap: 60px;
          bottom: 0;
          padding: 1.5rem;
          background: #fff;
          border-top: 1px solid #eee;
          border-radius: 0;
          align-items: center;
          z-index: 100;
        }
        .checkout-btn {
          background: #ffd97a;
          color: #22543d;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .checkout-btn:hover {
          background: #ffe9a7;
        }
        .total {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .total.clickable:hover {
          color: #22543d;
        }
        .price-summary-dropdown {
          position: absolute;
          left: 0;
          bottom: 70px;
          width: 350px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          padding: 1.5rem 1.2rem 1.2rem 1.2rem;
          z-index: 200;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        .summary-row.total-pay {
          font-weight: 700;
          font-size: 1.2rem;
          margin-top: 0.7rem;
        }
        .strike {
          text-decoration: line-through;
          color: #888;
          font-size: 1rem;
          margin-left: 4px;
        }
        .savings-banner {
          background: #22643d;
          color: #fff;
          border-radius: 7px;
          padding: 0.7rem 1rem;
          margin: 1rem 0 0.7rem 0;
          font-weight: 500;
          text-align: center;
        }
        .payment-icons {
          display: flex;
          gap: 0.7rem;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .payment-icons img {
          height: 28px;
          width: auto;
        }
        .secured-payments {
          text-align: center;
          color: #444;
          font-size: 1rem;
          margin-top: 0.2rem;
        }
        .cart-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .promo-card {
          background: #e8f5e9;
          padding: 1.2rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .promo-card h2 {
          color: #2e7d32;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .cart-item {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .item-layout {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .img-container {
          flex-shrink: 0;
        }

        .item-details {
          flex-grow: 1;
        }

        .item-details h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .price {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .qty-btn {
          background: none;
          border: 1px solid #ddd;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .buy-now-btn {
          background-color: #034;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          width: 200px;
        }

        .login-section {
          text-align: center;
          margin-top: 2rem;
        }

        .login-text {
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .login-text span {
          color: blue;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Page;
