"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./des.css"; // Import the CSS file for styling
import { Button } from "@headlessui/react";

export default function Page({ params }) {
  const route = useRouter();
  const { productId } = params; // Destructure productId from params directly
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sections, setSections] = useState({
    description: false,
    ingredients: false,
    benefits: false,
    storageInfo: false,
  });

  const buy = () => {
    if (!selectedOption) {
      alert("Please select a product size before proceeding.");
      return;
    }
    console.log("Buying:", selectedOption, quantity);
    route.push(
      `/checkout/${productId}?selectedSize=${selectedOption._id}&quantity=${quantity}`
    );
  };

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/api/admin/pro/${productId}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleOptionChange = (size) => {
    setSelectedOption(size);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="containerp">
      <div className="grid">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="product-image"
          />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="product-name">{product?.name}</h1>

          {/* Sizes Section */}
          <div className="size-section" style={{ justifyContent: "center" }}>
            <div className="size-options">
              {product?.sizes.map((size) => (
                <div
                  key={size._id}
                  className={`size-option ${
                    selectedOption?._id === size._id ? "selected" : ""
                  }`}
                  onClick={() => handleOptionChange(size)}
                >
                  <span className="size-name">{size.size} jar</span>
                  <span className="size-price">₹{size.price}</span>
                  <span className="size-off">10% off</span>
                  <span className="price-per-liter">
                    ₹{(size.price / parseInt(size.size)).toFixed(2)}/L
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div
            className="quantity-selector"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button className="quantity-button" onClick={handleDecrease}>
              -
            </button>
            <input
              type="number"
              value={quantity}
              className="quantity-input"
              readOnly
            />
            <button className="quantity-button" onClick={handleIncrease}>
              +
            </button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <button className="button add-to-cart">Add to Cart</button>
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "red",
                color: "white",
              }}
              className="button buy-now"
              onClick={buy}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Images Section */}
      {product?.additionalImages && product?.additionalImages.length > 0 && (
        <div className="additional-images">
          <div className="additional-images-container">
            {product.additionalImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Additional image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      <div className="collapsible-section">
        <div
          className="section-header"
          onClick={() => toggleSection("description")}
        >
          <h3>Description</h3>
          <span>{sections.description ? "-" : "+"}</span>
        </div>
        {sections.description && <p>{product?.description}</p>}
      </div>

      <div className="collapsible-section">
        <div
          className="section-header"
          onClick={() => toggleSection("ingredients")}
        >
          <h3>Ingredients</h3>
          <span>{sections.ingredients ? "-" : "+"}</span>
        </div>
        {sections.ingredients && <p>{product?.ingredients}</p>}
      </div>

      <div className="collapsible-section">
        <div
          className="section-header"
          onClick={() => toggleSection("benefits")}
        >
          <h3>Benefits</h3>
          <span>{sections.benefits ? "-" : "+"}</span>
        </div>
        {sections.benefits && <p>{product?.Benefits}</p>}
      </div>

      <div className="collapsible-section">
        <div
          className="section-header"
          onClick={() => toggleSection("storageInfo")}
        >
          <h3>Storage Info</h3>
          <span>{sections.storageInfo ? "-" : "+"}</span>
        </div>
        {sections.storageInfo && <p>{product?.storageinfo}</p>}
      </div>
    </div>
  );
}
