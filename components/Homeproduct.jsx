"use client";
import React, { useEffect, useState } from "react";
import "./pd.css";
import Link from "next/link";
import axios from "axios";

export default function Homeproduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/product");
        const productsData = response.data.products.slice(0, 8); // Only get the first 4 products
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
        <h1>Best Sellers</h1>
      </div>
      <div className="product-listx" style={{ marginTop: "1px" }}>
        <div className="proconx">
          {products.map((product) => {
            const productId = product._id; // Declare the productId variable
            return (
              <Link key={productId} href={`/product/${productId}`}>
                <ProductCard product={product} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function ProductCard({ product }) {
  return (
    <div className="product-cardx">
      <div className="product-badgex">
        <h1>Top seller</h1>
      </div>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-imagekk"
      />
      <div className="product-detailsx">
        <p className="product-sizex">
          <label htmlFor="size">Choose a size:</label>
          <select
            name="size"
            id="size"
            style={{ borderBottom: "1px solid black" }}
          >
            {product.sizes.map((size) => (
              <option key={size._id} value={size.size}>
                {size.size} - ₹{size.price}
              </option>
            ))}
          </select>
        </p>
        <h3 className="product-namex">{product.name}</h3>
        {/* <div className="product-pricex">₹{product.price}</div> */}
        <div
          className="bns"
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          {" "}
          <button className="add-to-cartx">Add to cart</button>
          <button className="add-to-cartx">Buy now</button>
        </div>
      </div>
    </div>
  );
}
