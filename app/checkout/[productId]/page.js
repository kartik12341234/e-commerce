"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import "./a.css"; // Import the CSS file for styling

export default function CheckoutForm({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { productId } = React.use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedSizeId = searchParams.get("selectedSize");
  const [quantity, setQuantity] = useState(
    parseInt(searchParams.get("quantity") || "1")
  );

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/api/admin/pro/${productId}`);
        const selectedSize = response.data.product.sizes.find(
          (size) => size._id === selectedSizeId
        );
        setProduct({ ...response.data.product, selectedSize });
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId, selectedSizeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("start");
    try {
      const response = await axios.post("/api/buy/checkout", {
        userInfo,
        productId,
        product: product.name,
        quantity,
        price: product.selectedSize.price,
      });
      // if (response.status === 200) {
      //   router.push("/confirmation");
      // }
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error processing checkout:", err);
      alert("Error processing checkout. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="checkout-form">
      <div className="cf">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Contact Information</h3>
            <input
              style={{ marginLeft: "-20px" }}
              type="email"
              name="email"
              placeholder="Email Address"
              value={userInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-section">
            <h3>Delivery Information</h3>
            <input
              type="text"
              style={{ marginLeft: "-20px" }}
              name="name"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              style={{ marginLeft: "-20px" }}
              placeholder="Phone Number"
              value={userInfo.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              style={{ marginLeft: "-20px" }}
              placeholder="Address Line"
              value={userInfo.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              style={{ marginLeft: "-20px" }}
              placeholder="City"
              value={userInfo.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              style={{ marginLeft: "-20px" }}
              name="state"
              placeholder="State/Province"
              value={userInfo.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              style={{ marginLeft: "-20px" }}
              name="postalCode"
              placeholder="Postal Code"
              value={userInfo.postalCode}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              style={{ marginLeft: "-20px" }}
              name="country"
              placeholder="Country"
              value={userInfo.country}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="button buy-now"
            style={{ width: "50%" }}
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      <div className="order-summary">
        <div className="order-details">
          <h3
            style={{
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Order Details
          </h3>
          <div className="quantity-selector">
            <button
              type="button"
              onClick={handleDecrease}
              style={{
                color: "#fff",
                backgroundColor: "black",
                width: "30px",
                height: "30px",
              }}
            >
              -
            </button>
            <input
              style={{
                height: "30px",
                width: "50px",
                textAlign: "center",
                // display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              type="number"
              value={quantity}
              readOnly
            />
            <button
              type="button"
              onClick={handleIncrease}
              style={{
                color: "#fff",
                backgroundColor: "black",
                width: "30px",
                height: "30px",
              }}
            >
              +
            </button>
          </div>
          <div className="dicount">
            <input
              placeholder="Discount Code"
              style={{
                height: "50px",
                width: "200px",
                color: "black",
                border: "1px solid grey",
                borderRadius: "1px",
                textAlign: "center",

                // display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              type="text"
              // value={discount}
              // readOnly
            />
            <button
              type="button"
              style={{
                color: "#fff",
                backgroundColor: "black",
                width: "100px",
                height: "50px",
              }}
            >
              Apply
            </button>
          </div>
          <div
            className="pr"
            style={{
              width: "100%",
              border: "1px solid #1469a2",
              borderRadius: "5px",
              backgroundColor: "#1469a2",
              height: "50px",
              padding: "10px",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <p>
              {product?.name} - {product?.selectedSize?.size || "N/A"} jar
            </p>
          </div>
          <p>
            Total Price: ₹{(product?.selectedSize?.price * quantity).toFixed(2)}
          </p>
        </div>
        <p>
          Subtotal: ₹
          {(product?.selectedSize?.price * quantity)?.toFixed(2) || "0.00"}
        </p>
        <p>Shipping: Calculated at checkout</p>
        <p className="total">
          Total: ₹
          {(product?.selectedSize?.price * quantity)?.toFixed(2) || "0.00"}
        </p>
      </div>
    </div>
  );
}
