"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Array of oil categories with enhanced data
  const oils = [
    {
      id: "wood-pressed-oil",
      name: "Wood Pressed Oil",
      image: "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
      description: "Traditional cold-pressed oils made with wooden churners for authentic flavor and maximum nutrition",
      itemCount: "12+ varieties",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      icon: "🌾"
    },
    {
      id: "ghee",
      name: "Pure Ghee", 
      image: "https://www.rosierfoods.com/cdn/shop/collections/image_867e0c03-ac86-45ae-9acc-494cbb52a8d5.jpg?v=1712577492",
      description: "Premium quality clarified butter made from grass-fed cow milk using traditional methods",
      itemCount: "8+ varieties",
      color: "bg-gradient-to-br from-yellow-400 to-amber-500",
      icon: "🧈"
    },
    {
      id: "nuts-dry-fruits",
      name: "Nuts & Dry Fruits",
      image: "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
      description: "Fresh, premium quality nuts and dry fruits sourced directly from farms",
      itemCount: "25+ varieties",
      color: "bg-gradient-to-br from-red-400 to-pink-500",
      icon: "🥜"
    },
    {
      id: "super-foods",
      name: "Super Foods",
      image: "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
      description: "Nutrient-dense superfoods to boost your health and wellness naturally",
      itemCount: "15+ varieties",
      color: "bg-gradient-to-br from-green-400 to-emerald-500",
      icon: "🌱"
    },
    {
      id: "sugar-free-snacks",
      name: "Sugar-Free Snacks",
      image: "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
      description: "Delicious and healthy snacks made without added sugar for guilt-free indulgence",
      itemCount: "18+ varieties",
      color: "bg-gradient-to-br from-purple-400 to-indigo-500",
      icon: "🍿"
    },
    {
      id: "avocado-oil",
      name: "Avocado Oil",
      image: "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
      description: "Premium cold-pressed avocado oil perfect for cooking and skincare",
      itemCount: "5+ varieties",
      color: "bg-gradient-to-br from-lime-400 to-green-500",
      icon: "🥑"
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-amber-600 font-medium">Loading Categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      

      {/* Main Content */}
      <div className="py-16 px-4">
        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {oils.map((oil, index) => (
              <Link href={`/products/${oil.id}`} key={oil.id}>
                <div
                  className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-700 hover:shadow-2xl ${
                    hoveredIndex === index 
                      ? 'scale-105 -rotate-1 shadow-2xl' 
                      : 'hover:scale-105 hover:-rotate-1'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isLoading ? 'none' : 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Category Color Strip */}
                  <div className={`h-2 w-full ${oil.color}`}></div>
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={oil.image}
                      alt={oil.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-2xl">{oil.icon}</span>
                    </div>

                    {/* Item Count Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                      {oil.itemCount}
                    </div>

                    {/* Hover Shop Button */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2">
                        <span>Shop Now</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                      {oil.name}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {oil.description}
                    </p>
                    
                    {/* Progress Bar Animation */}
                    <div className="w-full bg-gray-100 rounded-full h-1 mb-4">
                      <div 
                        className={`h-1 ${oil.color} rounded-full transition-all duration-1000 group-hover:w-full`}
                        style={{width: hoveredIndex === index ? '100%' : '0%'}}
                      ></div>
                    </div>

                    {/* View Products Link */}
                    <div className="flex items-center text-amber-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm">View Products</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-amber-200 to-orange-300 rounded-bl-3xl opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-gradient-to-tr from-amber-200 to-orange-300 rounded-tr-3xl opacity-60"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
       

       
     
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}