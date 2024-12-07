"use client";
import { useState } from "react";
import styles from "./Products.module.css";
import SmallBox from "./SmallBox";

const products = [
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    src: "https://cdn.shopify.com/s/files/1/0270/3346/9006/products/co_anv_01_glass_1L_720x720.jpg?v=1714108724",
    name: "Hallikar halikar Cow Ghee",
    desc: "Experience the richness of our Hallikar Desi Cow Ghee, handcrafted for purity in Karnataka.",
    price: "₹999",
    oldPrice: "₹1,110",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    src: "https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  // Add more products here if needed
];

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className={styles.container}>
      {/* <h1>Our Products</h1> */}
      <div className={styles.grid}>
        {products.map((product, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => openModal(product)}
            style={{
              position: "relative",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <video
              className={styles.videoPreview}
              src={product.videoSrc}
              muted
              loop
              autoPlay
              style={{ width: "100%", height: "310px", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                border: "1px solid #000",
                right: "10px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.src}
                  alt={product.name}
                  style={{
                    width: "50px",
                    height: "50px",
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
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{ margin: "0", color: "#4CAF50", fontSize: "16px" }}
                  >
                    {product.price}
                  </p>
                </div>
              </div>
              <button
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Add to Cart
                <span
                  style={{
                    marginLeft: "5px",
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    backgroundImage:
                      'url("https://www.svgrepo.com/show/200086/shopping-cart.svg")',
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                ></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <video controls className={styles.video}>
              <source src={selectedProduct.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h2 style={{ textAlign: "center", fontWeight: "500" }}>
              {selectedProduct.name}
            </h2>
            <p>{selectedProduct.desc}</p>
            <p className={styles.price}>
              {selectedProduct.price}{" "}
              <span className={styles.oldPrice}>
                {selectedProduct.oldPrice}
              </span>
            </p>
            <button
              style={{ marginRight: "20px" }}
              className={styles.button}
              onClick={() => alert("Added to Cart!")}
            >
              More Info
            </button>
            <button
              className={styles.button}
              onClick={() => alert("Added to Cart!")}
            >
              Add to Cart
            </button>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
