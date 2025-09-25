"use client";
import { useState, useEffect } from "react";
import styles from "./Products.module.css";
import SmallBox from "./SmallBox";
import { ShoppingBag } from "lucide-react";
import React from "react";

const products = [
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4",
    src: "https://cdn.shopify.com/s/files/1/0270/3346/9006/products/co_anv_01_glass_1L_720x720.jpg?v=1714108724",
    name: "Hallikar halikar Cow Ghee",
    desc: "Experience the richness of our Hallikar Desi Cow Ghee, handcrafted for purity in Karnataka.",
    price: "₹999",
    oldPrice: "₹1,110",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil Premium",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil Deluxe",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil Gold",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
];

// Utility to detect mobile
function isMobile() {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Detect mobile on mount
  useEffect(() => {
    setMobile(isMobile());
  }, []);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const handleVideoPlay = (videoElement) => {
    if (videoElement && !mobile) {
      videoElement.play().catch((error) => {
        console.log("Video autoplay failed:", error);
        // Fallback to image if video fails
      });
    }
  };

  const handleMouseEnter = (index) => {
    if (!mobile) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!mobile) {
      setHoveredIndex(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => openModal(product)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            {/* Always show image first, video only on hover for desktop */}
            <div style={{ position: "relative", width: "100%", height: "310px" }}>
              <img
                src={product.src}
                alt={product.name}
                style={{ 
                  width: "100%", 
                  height: "310px", 
                  objectFit: "cover",
                  display: mobile || hoveredIndex !== index ? "block" : "none"
                }}
              />
              
              {!mobile && hoveredIndex === index && (
                <video
                  ref={(el) => {
                    if (el && hoveredIndex === index) {
                      handleVideoPlay(el);
                    }
                  }}
                  src={product.videoSrc}
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  preload="metadata"
                  style={{ 
                    width: "100%", 
                    height: "310px", 
                    objectFit: "cover",
                    position: "absolute",
                    top: "0",
                    left: "0"
                  }}
                  onError={(e) => {
                    console.log("Video failed to load");
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                right: "10px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.src}
                  alt={product.name}
                  style={{
                    width: "65px",
                    height: "65px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <h3
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#2a431c",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      margin: "0",
                      color: "#2a431c",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.price}
                  </p>
                </div>
              </div>
              
              <div style={{ display: "flex", marginTop: "10px" }}>
                <button
                  style={{
                    flex: "1",
                    padding: "10px",
                    backgroundColor: "#2a431c",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added to Cart!");
                  }}
                >
                  Add to Cart
                </button>
                
                <button
                  style={{
                    padding: "10px",
                    backgroundColor: "#2a431c",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "50px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added to Cart!");
                  }}
                >
                  <ShoppingBag color="white" size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal with Beautiful Tailwind Design */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Section - 80% of modal height */}
            <div className="relative h-[60vh] min-h-[400px]">
              <video 
                controls 
                className="w-full h-full object-contain bg-black rounded-t-2xl"
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                poster={selectedProduct.src}
              >
                <source src={selectedProduct.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Close Button - Top Right */}
              <button 
                className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                onClick={closeModal}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Product Image and Name */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={selectedProduct.src}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-700">
                      {selectedProduct.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {selectedProduct.oldPrice}
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                      SAVE ₹{parseInt(selectedProduct.oldPrice.replace('₹', '')) - parseInt(selectedProduct.price.replace('₹', ''))}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {selectedProduct.desc}
              </p>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => alert("Added to Cart!")}
                  >
                    🛒 Add to Cart
                  </button>
                  
                  <button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => alert("More Info!")}
                  >
                    ℹ️ More Info
                  </button>
                </div>
                
                <button 
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-all duration-200 border border-gray-200"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
              <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Free Shipping
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  7 Day Return
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Premium Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add these styles to your CSS file or inline */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}