"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import "./pq.css";
import Pl from "@/components/Pl";
import { useRouter } from "next/navigation";
import { ShoppingBag, Zap } from "lucide-react";
import { FaHeart } from "react-icons/fa";
export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/product");
        const productsData = response.data.products.slice(0, 1000); // Only get the first 8 products
        setProducts(productsData);
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pl />
      <div className="ti">
        <h1>Best Sellers</h1>
      </div>
      <div className="product-listxw" style={{ marginTop: "1px" }}>
        <div className="proconxw">
          {products.map((product) => {
            const productId = product._id;
            return (
              <div key={productId}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const route = useRouter();
  const [cartItems, setCartItems] = useState({
    useremail: localStorage.getItem("loginid"),
    productId: product._id,
    productName: product.name,
    price: product.sizes[0].price,
  });

  const addtocart = (e) => {
    e.preventDefault(); // Prevents the default link navigation behavior
    // You can now perform the "Add to Cart" functionality
    axios
      .post(`/api/mycart/${cartItems.useremail}`, cartItems)
      .then((response) => {
        console.log("Cart updated:", response);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <div className="product-cardxw">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-imagekkw"
      />
      <div className="product-detailsxw">
        <p className="product-sizexw">
          <label htmlFor="size">Choose a size:</label>
          <select
            name="size"
            id="size"
            style={{ borderBottom: "1px solid black" }}
            onChange={(e) =>
              setCartItems({
                ...cartItems,
                price: product.sizes.find(
                  (size) => size.size === e.target.value
                ).price,
              })
            }
          >
            {product.sizes.map((size) => (
              <option key={size._id} value={size.size}>
                {size.size} - ₹{size.price}
              </option>
            ))}
          </select>
        </p>
        <h3 className="product-namexw">{product.name}</h3>
        <div
          className="bns"
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <button
            className="add-to-cartxw"
            onClick={addtocart}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <ShoppingBag></ShoppingBag> Add to cart
          </button>
          <button
            style={{ display: "flex", justifyContent: "space-evenly" }}
            className="add-to-cartxw"
            onClick={() => {
              route.push(`/product/${product._id}`);
            }}
          >
            <Zap></Zap> Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
