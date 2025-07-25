"use client";
import React, { useEffect, useRef, useState } from "react";
import Wr from "@/components/Wr";
import { useRouter } from "next/navigation";
import axios from "axios";
import Homeproduct from "@/components/Homeproduct";
import Image from "next/image";
import { User, UserCheck } from "lucide-react";
import OilsTable from "@/components/OilsTable";
import "./des.css"; // Import the CSS file for styling
import CustomerReviews from "@/components/Review";
import { Minus, Plane, Plus } from "lucide-react";
import Pl from "@/components/Pl";
export default function Page({ params }) {
  // Unwrap params if it's a Promise (Next.js 14+)
  let productIdParam = params?.productId;
  try {
    if (typeof params?.then === 'function') {
      // params is a Promise
      params = React.use(params);
      productIdParam = params.productId;
    }
  } catch (e) {}

  const route = useRouter();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    productId: productIdParam,
    username: "",
    verified: false,
    rating: 5,
    comment: "",
  });
  const [productId, setProductId] = useState(productIdParam);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [showCartBar, setShowCartBar] = useState(false);
  const number = Math.floor(Math.random() * 85) + 1;
  const reviewSectionRef = useRef(null);

  // useEffect for scroll bar
  useEffect(() => {
    const handleScroll = () => {
      setShowCartBar(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user email once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("loginid");
      setUseremail(email);
    }
  }, []);

  // Set productId from params
  useEffect(() => {
    setProductId(productIdParam);
  }, [productIdParam]);

  // Fetch product details and reviews
  useEffect(() => {
    if (!productId) return;
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/api/admin/pro/${productId}`);
        setProduct(response.data.product);
        setLoading(false);
        fetchReviews(response.data.product._id);
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [productId]);

  // Fetch reviews
  const fetchReviews = async (id = productId) => {
    if (!id) return;
    try {
      const response = await axios.get(`/api/reviews/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Handlers
  const handleScrollToReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const handleOptionChange = (size) => setSelectedOption(size);
  const buy = () => {
    if (!selectedOption) {
      alert("Please select a product size before proceeding.");
      return;
    }
    route.push(`/checkout/${productId}?selectedSize=${selectedOption._id}&quantity=${quantity}`);
  };
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const addtocart = () => {
    alert("added to cart");
    // Add to cart logic here
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/reviews/${productId}`, newReview);
      setNewReview({
        productId: productId,
        username: "",
        verified: false,
        rating: 5,
        comment: "",
      });
      alert("Review submitted successfully!");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const toggleCollapse = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const renderCollapsibleSection = (sectionName, data) => {
    if (!data || data.length === 0) return null;
    return (
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => toggleCollapse(sectionName)}
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            display: "flex",
            color: "#2d3748",
            padding: "8px",
            borderRadius: "8px",
            width: "100%",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e2e8f0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#edf2f7")}
        >
          <h1 style={{ textTransform: "uppercase" }}>{sectionName}</h1>
          <h1>
            {collapsedSections[sectionName] ? <Minus /> : <Plus />}
          </h1>
        </button>
        {collapsedSections[sectionName] && (
          <div
            className="hiiio"
            style={{
              marginTop: "8px",
              display: "flex",
              gap: "20px",
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: "16px",
                }}
              >
                <div
                  className="dio"
                  style={{
                    marginLeft: "80px",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={`Image for ${sectionName}`}
                    width={80}
                    height={80}
                    style={{
                      marginTop: "10px",
                      borderRadius: "8px",
                      marginLeft: "10%",
                      marginBottom: "16px",
                      maxHeight: "80px",
                    }}
                  />
                  <div style={{ wordWrap: "break-word" }}>
                    <p
                      style={{
                        width: "100%",
                        fontSize: "1rem",
                        color: "#000",
                        lineHeight: "1.5",
                        fontWeight: "400",
                        border: "1px solid #f5f5f5",
                        margin: "8px 10px 0",
                      }}
                    >
                      {item.paragraph}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Log and adjust sections dynamically based on the product object
  const sections = Object.keys(product).reduce((acc, key) => {
    if (product[key] && Array.isArray(product[key])) {
      acc[key] = product[key];
    }
    return acc;
  }, {});

  return (
    <>
      <Pl></Pl>{" "}
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
            <h1 className="product-name" style={{ marginTop: "25px" }}>
              {product?.name}
            </h1>
            <div
              className="fdgshj"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h1 className="product-nam" style={{ marginTop: "-5px" }}>
                <span style={{ color: "#f2cb05", fontSize: "15px" }}>
                  ⭐⭐⭐⭐⭐
                </span>{" "}
                <span>| {number} reviews</span>
              </h1>

              {selectedOption ? (
                <h1 className="product-price" style={{}}>
                  Price: ₹{selectedOption.price * quantity}
                  <span style={{ fontSize: "20px", color: "#000000" }}>
                    MRP (Incl. of all taxes)
                  </span>
                </h1>
              ) : (
                <h1 className="product-price">
                  Select a size to see the price
                </h1>
              )}
            </div>

            <h1
              style={{
                marginTop: "-20px",

                color: "grey",
              }}
              className="product-nam"
              onClick={handleScrollToReviews}
            >
              <span
                style={{
                  marginTop: "-15px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#000",
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
                        borderBottom: "3px solid black",
                        // marginTop: "-2px",
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
                      <span
                        className="size-price"
                        style={{
                          color: "black",
                          width: "100%",
                          borderBottom: "1px solid #000",
                        }}
                      >
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
            {/* <div
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
            </div> */}

            {/* Add to Cart and Buy Now Buttons */}
            <div
              // className="buttos"
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                // backgroundColor: "#2a431c",
              }}
            >
              <button
                className=""
                onClick={addtocart}
                style={{
                  width: "400px",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "22px",
                  backgroundColor: "#2a431c",
                }}
              >
                ADD TO CART
              </button>
              <div
                className="quantity-selector"
                style={{
                  // marginLeft: "100px",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  width: "200px",
                }}
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
            </div>
            <div
              className="biooowe"
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: "#2a431c",

                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {" "}
              <button
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",

                  backgroundColor: "#2a431c",
                  color: "white",
                  fontSize: "25px",
                }}
                // className="button buy-now"
                onClick={buy}
              >
                BUY NOW
              </button>
            </div>
            <button
              style={{
                cursor: "pointer",
                backgroundColor: "#2a431c",
                color: "white",
                fontWeight: "700",
                fontSize: "25px",
              }}
              // className="button buy-nows"
              onClick={buy}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
        {/* Fixed Cart Bar: Only show after scrolling down a bit */}
        {showCartBar && (
          <div
            className="cart-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              bottom: "60px",
              width: "100%",
              zIndex: 1000,
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              padding: "12px 0",
            }}
          >
            <div
              className="buttons-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                gap: "16px",
                alignItems: "center",
                maxWidth: "900px",
              }}
            >
              <button
                onClick={addtocart}
                style={{
                  flex: 1,
                  color: "#fff",
                  fontWeight: 700,
                  textAlign: "center",
                  fontSize: "22px",
                  backgroundColor: "#2a431c",
                  border: "none",
                  borderRadius: "8px",
                  height: "52px",
                  minWidth: "160px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  transition: "background 0.2s",
                }}
              >
                ADD TO CART
              </button>
              <div
                className="quantity-selector"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  border: "1.5px solid #2a431c",
                  borderRadius: "8px",
                  height: "52px",
                  minWidth: "120px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <button
                  className="quantity-button"
                  onClick={handleDecrease}
                  style={{
                    background: "#2a431c",
                    color: "#fff",
                    border: "none",
                    width: "44px",
                    height: "100%",
                    fontSize: "22px",
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  className="quantity-input"
                  readOnly
                  style={{
                    width: "40px",
                    textAlign: "center",
                    fontSize: "20px",
                    border: "none",
                    outline: "none",
                    background: "#fff",
                  }}
                />
                <button
                  className="quantity-button"
                  onClick={handleIncrease}
                  style={{
                    background: "#2a431c",
                    color: "#fff",
                    border: "none",
                    width: "44px",
                    height: "100%",
                    fontSize: "22px",
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  +
                </button>
              </div>
              <button
                style={{
                  flex: 1,
                  color: "#fff",
                  fontWeight: 700,
                  backgroundColor: "#2a431c",
                  textAlign: "center",
                  fontSize: "22px",
                  border: "none",
                  borderRadius: "8px",
                  height: "52px",
                  minWidth: "160px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  transition: "background 0.2s",
                }}
                onClick={buy}
              >
                BUY NOW
              </button>
            </div>
          </div>
        )}

        <div style={{ padding: "16px" }}>
          {Object.keys(sections)
            .slice(0, -2)
            .map((sectionName) => {
              const sectionData = sections[sectionName];
              if (!sectionData || sectionData.length === 0) {
                return null; // Skip rendering sections with no data
              }
              return renderCollapsibleSection(sectionName, sectionData);
            })}
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
        {/* <div className="collapsible-section">
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
    </div>*/}
      </div>
      <div className="msa" ref={reviewSectionRef}>
        <>
          <h2>Customer Reviews</h2>
          <Wr></Wr>

          <div className="reviews-container">
            <div className="review-summary">
              {/* Add a summary UI for the average rating */}
            </div>
            <form onSubmit={handleSubmit} className="review-form">
              <input
                type="text"
                placeholder="Your name"
                value={newReview.username}
                onChange={(e) =>
                  setNewReview({ ...newReview, username: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Write your review"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
              />
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: parseInt(e.target.value),
                  })
                }
              >
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <button type="submit" style={{ backgroundColor: "#2a431c" }}>
                Submit Review
              </button>
            </form>

            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="review">
                  <div className="rating">
                    {Array(review.rating).fill("⭐")}
                  </div>
                  <h3 style={{ display: "flex", gap: "10px" }}>
                    <div
                      className="dj"
                      style={{ backgroundColor: "grey", borderRadius: "4px" }}
                    >
                      <UserCheck color="#000"></UserCheck>{" "}
                    </div>
                    {review.username}{" "}
                    {/* <span className="verified" style={{ marginLeft: "-6px" }}>
                          Veified ✔{" "}
                        </span> */}
                    {review.verified && (
                      <span className="verified" style={{ marginLeft: "-5px" }}>
                        Veified ✔{" "}
                      </span>
                    )}
                  </h3>
                  <p>{review.comment}</p>
                  <div className="review-footer">
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                    <div>
                      <button>👍 {review.helpfulVotes}</button>
                      <button>👎 {review.notHelpfulVotes}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      </div>
      <OilsTable></OilsTable>
      <div className="cin" style={{ marginTop: "150px" }}>
        <Homeproduct></Homeproduct>
      </div>
    </>
  );
}
