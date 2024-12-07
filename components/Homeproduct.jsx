"use client";
import React, { useEffect, useState, useRef } from "react";
import "./pd.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For navigation
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { ShoppingBag, Zap } from "lucide-react";

export default function Homeproduct() {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/product");
        const productsData = response.data.products.slice(0, 8);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to scroll left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

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
        <button onClick={scrollLeft} className="scroll-button left">
          &lt;
        </button>
        <div className="proconx" ref={scrollContainerRef}>
          {products.map((product) => {
            const productId = product._id;
            return <ProductCard key={productId} product={product} />;
          })}
        </div>
        <button onClick={scrollRight} className="scroll-button right">
          &gt;
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  // Load the initial state from localStorage
  useEffect(() => {
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    if (likedProducts.includes(product._id)) {
      setIsLiked(true);
    }
  }, [product._id]);

  // Handle heart icon click
  const handleHeartClick = () => {
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    if (isLiked) {
      // Remove product ID from localStorage
      const updatedProducts = likedProducts.filter((id) => id !== product._id);
      localStorage.setItem("likedProducts", JSON.stringify(updatedProducts));
    } else {
      // Add product ID to localStorage
      likedProducts.push(product._id);
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    }
    setIsLiked(!isLiked);
  };

  // Handle Buy Now button click
  const handleBuyNow = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div className="product-cardx">
      <div className="product-badgex">
        <h1>Best Seller</h1>
        <FaHeart
          onClick={handleHeartClick}
          style={{
            color: isLiked ? "red" : "white",
            cursor: "pointer",
          }}
          size={24}
        />
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
            className="add-to-cartx"
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {" "}
            <ShoppingBag></ShoppingBag> Add to cart
          </button>
          <button
            className="add-to-cartx"
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            onClick={handleBuyNow}
          >
            <Zap></Zap> Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
