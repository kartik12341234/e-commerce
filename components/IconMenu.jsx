"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const IconMenu = () => {
  const [popup, setPopup] = useState({ open: false, src: "" });

  const icons = [
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      fullSrc:
        "https://www.anveshan.farm/cdn/shop/files/anveshan-hallikar-cow-ghee_500g.jpg?v=1722855359&width=360",
      label: "New",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      fullSrc: "https://via.placeholder.com/600/00FF00/FFFFFF?text=Ghee+Image",
      label: "Ghee",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      fullSrc:
        "https://www.anveshan.farm/cdn/shop/files/anveshan-hallikar-cow-ghee_500g.jpg?v=1722855359&width=360",
      label: "Oil",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      fullSrc: "https://via.placeholder.com/600/FFFF00/000000?text=Deals+Image",
      label: "Deals",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      fullSrc: "https://via.placeholder.com/600/FF00FF/FFFFFF?text=₹999+Image",
      label: "₹999",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      fullSrc: "https://via.placeholder.com/600/00FFFF/000000?text=All+Image",
      label: "All",
    },
  ];

  const handleIconClick = (fullSrc) => {
    setPopup({ open: true, src: fullSrc });
  };

  const handleClosePopup = () => {
    setPopup({ open: false, src: "" });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => handleIconClick(icon.fullSrc)}
        >
          <motion.img
            src={icon.src}
            alt={icon.label}
            width={60}
            height={60}
            style={{
              border: "2px solid red",
              borderRadius: "50%",
              padding: "3px",
            }}
            whileHover={{ boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)" }}
            transition={{ duration: 0.3 }}
          />
          <p style={{ marginTop: "10px", fontSize: "14px" }}>{icon.label}</p>
        </motion.div>
      ))}

      {popup.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <img
              src={popup.src}
              alt="Popup"
              style={{ maxWidth: "90%", maxHeight: "80%" }}
            />
            <button
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconMenu;
