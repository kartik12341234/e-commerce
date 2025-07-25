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
        padding: "28px 20px 32px 20px",
        background: "#f8fafc",
        borderRadius: "18px",
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.08)",
        margin: "32px auto 0 auto",
        maxWidth: 900,
      }}
    >
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.13, y: -8, boxShadow: "0 8px 32px 0 rgba(0,112,74,0.18)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
            padding: "18px 12px 12px 12px",
            cursor: "pointer",
            transition: "box-shadow 0.2s, transform 0.2s",
            border: "1.5px solid #e0e7ef",
            minWidth: 60,
          }}
          onClick={() => handleIconClick(icon.fullSrc)}
        >
          <motion.img
            src={icon.src}
            alt={icon.label}
            width={60}
            height={60}
            style={{
              border: "2.5px solid #7c3aed",
              borderRadius: "50%",
              padding: "4px",
              background: "#f3f4f6",
              boxShadow: "0 2px 8px 0 rgba(124,58,237,0.08)",
            }}
            whileHover={{ boxShadow: "0 0 18px 0 rgba(124,58,237,0.18)" }}
            transition={{ duration: 0.3 }}
          />
          <p style={{ marginTop: "12px", fontSize: "15px", fontWeight: 600, color: "#222", letterSpacing: 0.2 }}>{icon.label}</p>
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
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "32px 24px 24px 24px",
              textAlign: "center",
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={popup.src}
              alt="Popup"
              style={{ maxWidth: "80vw", maxHeight: "60vh", borderRadius: "10px" }}
            />
            <button
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                top: "12px",
                right: "16px",
                padding: "6px 14px",
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 2px 8px 0 rgba(124,58,237,0.12)",
                transition: "background 0.2s",
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
