"use client";

import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.css"; // Import CSS module

const images = [
  "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100", // Replace with your image paths
  "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
  "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
  "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div className={styles.carouselItem} key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
