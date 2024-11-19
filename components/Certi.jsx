import React from "react";
import "./CertificationSlider.css"; // Import the CSS file

const CertificationSlider = () => {
  const images = [
    "https://www.anveshan.farm/cdn/shop/files/anv-ftr-4.png?v=1729241487&width=480",
    "https://www.anveshan.farm/cdn/shop/files/anv-ftr-1.png?v=1729241557&width=480",
    "https://www.anveshan.farm/cdn/shop/files/anv-ftr-2.png?v=1729241487&width=480",
    "https://www.anveshan.farm/cdn/shop/files/anv-ftr-3.png?v=1729241487&width=480",
    "https://www.anveshan.farm/cdn/shop/files/anv-ftr-5.png?v=1729241557&width=480",
    "https://www.anveshan.farm/cdn/shop/files/anv-ftr-6.png?v=1729241488&width=480",
  ];

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((src, index) => (
          <div className="slider-item" key={index}>
            <img src={src} alt={`Certification ${index + 1}`} />
          </div>
        ))}
        {/* Duplicate images for seamless looping */}
        {images.map((src, index) => (
          <div className="slider-item" key={`duplicate-${index}`}>
            <img src={src} alt={`Certification duplicate ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationSlider;
