"use client";
import { useState } from "react";
import styles from "./Products.module.css";
import SmallBox from "./SmallBox";
import { ShoppingBag } from "lucide-react";

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
              <div className="gre" style={{ display: "flex" }}>
                <button
                  style={{
                    marginTop: "10px",
                    width: "100%",
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
                  }}
                >
                  Add to Cart
                </button>
                <span
                  style={{
                    padding: "7px",
                    backgroundColor: "#2a431c",
                    marginLeft: "15px",
                    marginTop: "17px",
                    display: "inline-block",
                    height: "40px",
                    borderRadius: "5px",
                    width: "40px",
                  }}
                >
                  <ShoppingBag color="white"></ShoppingBag>
                </span>
              </div>
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
            <h2
              style={{
                textAlign: "center",
                fontWeight: "500",
                textDecoration: "underline",
              }}
            >
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
