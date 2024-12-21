"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import "./des.css"; // Import the CSS file for styling
import CustomerReviews from "@/components/Review";
import Know from "@/components/know";
import OilsTable from "@/components/OilsTable";
import Homeproduct from "@/components/Homeproduct";
import Wr from "@/components/Wr";
import ProductPage from "@/components/Productpage";
import Pl from "@/components/Pl";

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
  const [cartItems, setCartItems] = useState({
    useremail: localStorage.getItem("loginid"),
    productId,
    productName: product,
    price: "price",
  });
  const addtocart = () => {
    setCartItems(cartItems);
    console.log(cartItems);
    const response = axios.post(`/api/mycart/${useremail}`, cartItems).then;
    console.log(response);
  };
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
      <Pl></Pl>
      <div className="containerp">
        <div className="grid">
          {/* Product Image */}
          <div
            className="bio"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              gap: "10px",
            }}
          >
            <div className="lesh" style={{ marginLeft: "-30px" }}>
              {" "}
              {/* Additional Images Section */}
              {product?.additionalImages &&
                product?.additionalImages.length > 0 && (
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
            </div>
            <div className="product-image-container">
              <img
                src={product?.imageUrl}
                alt={product?.name}
                className="product-image"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h1 className="product-name" style={{ marginTop: "20px" }}>
              {product?.name}
            </h1>
            <div
              className="fdgshj"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h1 className="product-nam" style={{ marginTop: "20px" }}>
                ⭐⭐⭐⭐⭐ <span>{number} reviews</span>
              </h1>
              {selectedOption ? (
                <h1 className="product-price" style={{ marginTop: "10px" }}>
                  Price: ₹{selectedOption.price * quantity}
                  <span style={{ fontSize: "8px", color: "grey" }}>
                    MRP (Incl. of all taxes)
                  </span>
                </h1>
              ) : (
                <h1 className="product-price">
                  Select a size to see the price
                </h1>
              )}
            </div>

            <h1 className="product-nam" onClick={handleScrollToReviews}>
              <span
                style={{
                  marginBottom: "-10px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "grey",
                }}
              >
                see all reviews
              </span>
            </h1>
            <div className="showimg" style={{ display: "flex", gap: "50px" }}>
              <img
                src={
                  "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60"
                }
                width={100}
                height={100}
                alt="Image"
              ></img>
              <img
                src={
                  "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60"
                }
                width={100}
                height={100}
                alt="Image"
              ></img>
              <img
                src={
                  "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60"
                }
                width={100}
                height={100}
                alt="Image"
              ></img>
              <img
                src={
                  "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60"
                }
                width={100}
                height={100}
                alt="Image"
              ></img>
            </div>

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
                    <div
                      className="high"
                      style={{
                        borderBottom: "1px solid black",
                        backgroundColor:
                          selectedOption?._id === size._id
                            ? "#00584b"
                            : "#ece9e98e",
                      }}
                    >
                      <span className="size-name">{size.size} jar</span>
                    </div>
                    <div
                      className="hyj"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <span className="size-price" style={{ color: "black" }}>
                        ₹{size.price}
                      </span>
                      <span className="size-price" style={{ color: "black" }}>
                        ₹{size.price / 1000}/ ml
                      </span>
                    </div>
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
              onClick={addtocart}
            >
              <button className="button add-to-cart">Add to Cart</button>
              <button
                style={{
                  cursor: "pointer",
                  backgroundColor: "#00574b",
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
        {/* {product?.additionalImages && product?.additionalImages.length > 0 && (
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
        )} */}
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
