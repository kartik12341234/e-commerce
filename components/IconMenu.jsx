"use client";
import { motion } from "framer-motion";

const IconMenu = () => {
  const icons = [
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      label: "New",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      label: "Ghee",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      label: "Oil",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      label: "Deals",
    },

    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      label: "₹999",
    },
    {
      src: "https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60",
      label: "All",
    },
  ];

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
          whileHover={{ scale: 1.2, rotate: 10 }} // Slight pop & rotate on hover
          whileTap={{ scale: 0.9 }} // Shrink effect on click
          animate={{ y: [0, -10, 0] }} // Smooth floating effect
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
            whileHover={{ boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)" }} // Highlight with shadow
            transition={{ duration: 0.3 }}
          />
          <p style={{ marginTop: "10px", fontSize: "14px" }}>{icon.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default IconMenu;
