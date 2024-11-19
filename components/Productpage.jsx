"use client";
import { useState } from "react";
import styles from "./Products.module.css";

const products = [
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    src: "https://cdn.shopify.com/s/files/1/0270/3346/9006/products/co_anv_01_glass_1L_720x720.jpg?v=1714108724",
    name: "Hallikar Cow Ghee",
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
          >
            <video
              className={styles.videoPreview}
              src={product.videoSrc}
              muted
              loop
              autoPlay
            />

            <h3>{product.name}</h3>
            <img
              style={{
                width: "100px",
                display: "flex",
                position: "absolute",
                marginTop: "-120px",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "50px",
              }}
              src={product.src}
              alt={product.name}
              width={100}
              height={200}
            ></img>
            <p className={styles.price}>
              {product.price}{" "}
              <span className={styles.oldPrice}>{product.oldPrice}</span>
            </p>
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
