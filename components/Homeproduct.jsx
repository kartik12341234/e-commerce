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
        const productsData = response.data.products.slice(0, 4); // Only get the first 4 products
        setProducts(productsData); // Set only the first 4 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      className="pd"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "-100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="ti">
        <h1>Top Products</h1>
      </div>
      <div className="product-list" style={{ marginTop: "1px" }}>
        <div className="procon">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-badge">
        <h1>Top seller</h1>
      </div>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <p className="product-size">{product.size}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">₹{product.price}</div>
        <button className="add-to-cart">Add to cart</button>
      </div>
    </div>
  );
}
