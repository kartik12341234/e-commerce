"use client";

import React, { useState } from "react";

const testimonials = [
  {
    text: "A variety of ways to use my favourite coconut oil and honey. My skin feels nourished, my cuticles are soft, my lips are smooth, and many other benefits come from using them!",
    name: "Minerva Thakur",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Akshay-Kumar_1_small.png?v=1683528708",
    rating: 5,
  },
  {
    text: "Their ghee helped solve my acid reflux problem. While cooking with wood-pressed oils imparts a unique taste and I feel lighter.",
    name: "Lakshmi Dev",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Akshay-Kumar_1_small.png?v=1683528708",
    rating: 5,
  },
  {
    text: "This ghee is the most healthy option out there for children. I use it regularly for my daughter and she loves the taste.",
    name: "Dr Shagun Walia",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Akshay-Kumar_1_small.png?v=1683528708",
    rating: 5,
  },
  {
    text: "I love their natural honey and oils! It has improved my immunity and is now a staple in my diet.",
    name: "Rohan Mehra",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Akshay-Kumar_1_small.png?v=1683528708",
    rating: 5,
  },
  {
    text: "I use their products daily, and they have become essential in my household. Highly recommended!",
    name: "Ananya Singh",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Akshay-Kumar_1_small.png?v=1683528708",
    rating: 5,
  },
  {
    text: "Their oils and ghee have completely transformed my diet and cooking style. A must-buy!",
    name: "Rajiv Patel",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Akshay-Kumar_1_small.png?v=1683528708",
    rating: 5,
  },
  {
    text: "I've noticed a visible improvement in my health and immunity after using their honey.",
    name: "Priya Sharma",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Akshay-Kumar_1_small.png?v=1683528708",
    rating: 5,
  },
];

const TestimonialCard = ({ text, name, image, rating }) => {
  return (
    <div
      style={{
        border: "1px solid #d3d3d3",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        backgroundColor: "#fff",
        maxWidth: "300px",
      }}
    >
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "30px",
          }}
        />
        <div>
          <strong>{name}</strong>
          <div style={{ color: "#FFD700", fontSize: "14px" }}>
            {"⭐".repeat(rating)}
          </div>
        </div>
      </div>
      <p style={{ fontSize: "14px", color: "#333", marginTop: "30px" }}>
        {text}
      </p>
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start index
  const itemsPerPage = 4; // Number of testimonials to show at a time

  const handleNext = () => {
    if (currentIndex + itemsPerPage < testimonials.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div
      style={{
        backgroundColor: "#FFF7E7",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h2
        style={{ color: "#2D4221", fontWeight: "bold", marginBottom: "20px" }}
      >
        What Do Our Customers Say
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {visibleTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: "#2D4221",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= testimonials.length}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2D4221",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor:
              currentIndex + itemsPerPage >= testimonials.length
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
