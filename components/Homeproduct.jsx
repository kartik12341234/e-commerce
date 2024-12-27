"use client";
import React, { useEffect, useState, useRef } from "react";
import "./pd.css";
// import { motion } from "framer-motion";
import Link from "next/link";
// import React-h
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Circle, CircleX, ShoppingBag, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Page from "@/app/cart/page";

export default function Homeproduct() {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/product");
        const productsData = response.data.products.slice(0, 8);

        // Add random review counts to each product
        const productsWithReviews = productsData.map((product) => ({
          ...product,
          reviews: Math.floor(Math.random() * 100) + 1,
        }));

        setProducts(productsWithReviews);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <motion.div
      className="pd"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
        <motion.button
          onClick={scrollLeft}
          className="scroll-button left"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &lt;
        </motion.button>
        <div className="proconx" ref={scrollContainerRef}>
          {products.map((product) => {
            const productId = product._id;
            return <ProductCard key={productId} product={product} />;
          })}
        </div>
        <motion.button
          onClick={scrollRight}
          className="scroll-button right"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &gt;
        </motion.button>
      </div>
    </motion.div>
  );
}

function ProductCard({ product }) {
  const useremail = localStorage.getItem("loginid");
  const [isLiked, setIsLiked] = useState(false);
  const [cartItems, setCartItems] = useState({
    useremail: localStorage.getItem("loginid"),
    productId: product._id,
    productName: product.name,
    imageUrl: product.imageUrl,
    price: product.sizes[0].price,
  });
  const router = useRouter();

  useEffect(() => {
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    if (likedProducts.includes(product._id)) {
      setIsLiked(true);
    }
  }, [product._id]);

  const handleHeartClick = () => {
    const likedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    if (isLiked) {
      const updatedProducts = likedProducts.filter((id) => id !== product._id);
      localStorage.setItem("likedProducts", JSON.stringify(updatedProducts));
    } else {
      likedProducts.push(product._id);
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    }
    setIsLiked(!isLiked);
  };

  const handleBuyNow = () => {
    router.push(`/product/${product._id}`);
  };
  const [showCart, setShowCart] = useState(false);
  const addtocart = () => {
    axios.post(`/api/mycart/${useremail}`, cartItems);
    console.log(cartItems);
    setShowCart(true);
    alert("Product added to cart!");
  };

  return (
    <>
      <motion.div
        className="product-cardx"
        whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          onClick={handleBuyNow}
        />
        <div className="product-detailsx">
          <p className="product-sizex">
            <label htmlFor="size" style={{ color: "black" }}>
              Choose a size:
            </label>
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
          <h3 className="product-namex" onClick={handleBuyNow}>
            {product.name}
          </h3>
          ⭐⭐⭐⭐⭐
          <span style={{ fontSize: "15px" }}>{product.reviews} reviews</span>
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
              onClick={addtocart}
              className="add-to-cartx"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <ShoppingBag /> Add to cart
            </button>
            <button
              className="add-to-cartx"
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
              onClick={handleBuyNow}
            >
              <Zap /> Buy now
            </button>
          </div>
        </div>
      </motion.div>
      {showCart && (
        <div
          className="nhio"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            color: "#fff",
            width: "35%", // Default width
            height: "100vh",
            backgroundColor: "#000",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            padding: "-2px",
            overflowY: "auto",
            zIndex: 1000,
            // Media query for screens <= 768px
            ...(window.innerWidth <= 768 ? { width: "100%" } : {}),
          }}
        >
          <CircleX
            color="#fff"
            onClick={() => {
              setShowCart(false);
            }}
          />
          <Page />
        </div>
      )}
    </>
  );
}
