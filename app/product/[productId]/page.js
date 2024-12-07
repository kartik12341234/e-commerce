"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./des.css"; // Import the CSS file for styling
import CustomerReviews from "@/components/Review";
import Know from "@/components/know";
import OilsTable from "@/components/OilsTable";
import Homeproduct from "@/components/Homeproduct";
import Wr from "@/components/Wr";

export default function Page({ params }) {
  const route = useRouter();
  const reviewSectionRef = useRef(null);

  const handleScrollToReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // State to manage productId
  const [productId, setProductId] = useState(null);
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
    route.push(
      `/checkout/${productId}?selectedSize=${selectedOption._id}&quantity=${quantity}`
    );
  };

  // Unwrapping the Promise-based params
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.productId);
    };
    fetchParams();
  }, [params]);

  // Fetch product details when productId is available
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

  const number = Math.floor(Math.random() * 85) + 1;

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
    <>
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
            <h1 className="product-nam">
              ⭐⭐⭐⭐⭐ <span>{number} reviews</span>
            </h1>

            <h1 className="product-nam" onClick={handleScrollToReviews}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "grey",
                }}
              >
                see all reviews
              </span>
            </h1>
            {selectedOption ? (
              <h1 className="product-price">
                Price: ₹{selectedOption.price * quantity}
              </h1>
            ) : (
              <h1 className="product-price">Select a size to see the price</h1>
            )}

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
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "#007aff",
                color: "white",
              }}
              className="button buy-nows"
              onClick={buy}
            >
              subscribe
            </button>
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

      <div className="msa" ref={reviewSectionRef}>
        <CustomerReviews></CustomerReviews>
      </div>
      <OilsTable></OilsTable>
      <div className="cin" style={{ marginTop: "150px" }}>
        <Homeproduct></Homeproduct>
      </div>

      <Know></Know>
      {/* <CertificationSlider></CertificationSlider> */}
    </>
  );
}
