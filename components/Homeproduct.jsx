"use client";
import React, { useEffect, useState } from "react";
import "./pd.css";
import axios from "axios";

export default function Homeproduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/product");
        console.log(response.data); // Add this to check the structure
        setProducts(response.data.products.slice(0, 4)); // Adjust based on the actual structure
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <div className="ti">
        <h1>Top Products</h1>
      </div>
      <div className="procon">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-badge">{product.badge}</div>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <p className="product-size">{product.size}</p>
        <h3 className="product-name">{product.name}</h3>
        {/* <div className="product-rating">
          {"★".repeat(product.rating)} {product.reviews} reviews
        </div> */}
        <div className="product-price">
          ₹{product.price}{" "}
          {/* <span className="original-price">₹{product.originalPrice}</span> */}
        </div>
        <button className="add-to-cart">Add to cart</button>
      </div>
    </div>
  );
}
