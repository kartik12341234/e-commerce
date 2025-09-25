"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { CircleX, ShoppingBag, Zap, ChevronLeft, ChevronRight } from "lucide-react";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-7xl mx-auto px-4 py-8"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Best Sellers</h1>
      </div>

      {/* Product List Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <motion.button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-teal-400 hover:bg-teal-500 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* Products Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth px-12 md:px-16 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: 'none'
          }}
        >
          {products.map((product) => {
            const productId = product._id;
            return <ProductCard key={productId} product={product} />;
          })}
        </div>

        {/* Right Scroll Button */}
        <motion.button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-teal-400 hover:bg-teal-500 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function ProductCard({ product }) {
  const useremail = localStorage.getItem("loginid");
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);
  const [cartItems, setCartItems] = useState({
    useremail: localStorage.getItem("loginid"),
    productId: product._id,
    productName: product.name,
    imageUrl: product.imageUrl,
    price: product.sizes[0]?.price || 0,
  });
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
    if (likedProducts.includes(product._id)) {
      setIsLiked(true);
    }
  }, [product._id]);

  useEffect(() => {
    // Update cart items when size changes
    setCartItems(prev => ({
      ...prev,
      price: product.sizes[selectedSize]?.price || 0,
    }));
  }, [selectedSize, product.sizes]);

  const handleHeartClick = () => {
    const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
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

  const addtocart = () => {
    if (!useremail) {
      // Get existing cart items from localStorage or initialize with an empty array
      const storedCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      // Check if the product is already in the cart to avoid duplicates
      const isProductInCart = storedCart.some(
        (item) => item.productId === cartItems.productId
      );

      if (!isProductInCart) {
        storedCart.push(cartItems);
        localStorage.setItem("guestCart", JSON.stringify(storedCart));
        alert("Product added to cart for guest user!");
      } else {
        alert("Product is already in the cart!");
      }
    } else {
      // Add to server cart if user is logged in
      axios.post(`/api/mycart/${useremail}`, cartItems).then(() => {
        alert("Product added to cart!");
      });
    }
    setShowCart(true);
  };

  return (
    <>
      <motion.div
        className="flex-shrink-0 w-64 bg-white border border-green-800 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0px 10px 25px rgba(0,0,0,0.15)" 
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Badge and Heart */}
        <div className="relative mb-3">
          <div className="absolute top-2 left-2 z-10 bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-2">
            <span>Best Seller</span>
            <FaHeart
              onClick={handleHeartClick}
              className={`cursor-pointer transition-colors duration-200 ${
                isLiked ? "text-red-500" : "text-white hover:text-red-300"
              }`}
              size={16}
            />
          </div>
          
          {/* Product Image */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={handleBuyNow}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-3">
          {/* Size Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose a size:
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {product.sizes?.map((size, index) => (
                <option key={size._id || index} value={index}>
                  {size.size} - ₹{size.price}
                </option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <h2 
            className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-green-700 transition-colors duration-200"
            onClick={handleBuyNow}
          >
            {product.name}
          </h2>

          {/* Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.reviews} reviews</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <motion.button
              onClick={addtocart}
              className="w-full bg-[#2a431c] hover:bg-[#2a431c] text-white py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag size={18} />
              Add to cart
            </motion.button>
            
            <motion.button
              onClick={handleBuyNow}
              className="w-full bg-[#2a431c] hover:bg-green-900 text-white py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap size={18} />
              Buy now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setShowCart(false)}
          ></div>
          <div className="fixed top-0 right-0 w-full h-full bg-white shadow-xl overflow-y-auto z-50 lg:w-96">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <CircleX
                className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                size={24}
                onClick={() => setShowCart(false)}
              />
            </div>
            
            <div className="p-4">
              <img
                src="https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Cart_banner.jpg?v=1734956547"
                alt="Cart Banner"
                className="w-full h-auto rounded-lg mb-4"
              />
              <Page />
            </div>
          </div>
        </div>
      )}
    </>
  );
}