"use client";
import { useState } from "react";
import styles from "./Products.module.css";

const products = [
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    name: "Hallikar Cow Ghee",
    desc: "Experience the richness of our Hallikar Desi Cow Ghee, handcrafted for purity in Karnataka.",
    price: "₹999",
    oldPrice: "₹1,110",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
    name: "Wood-Pressed Coconut Oil",
    desc: "100% pure coconut oil extracted traditionally, retaining essential nutrients.",
    price: "₹590",
    oldPrice: "₹720",
  },
  {
    videoSrc:
      "https://www.anveshan.farm/cdn/shop/files/quinn_z5944sj8vuit3m19ylqzk7ut.mp4#t=0.1",
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
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.desc}</p>
            <p className={styles.price}>
              {selectedProduct.price}{" "}
              <span className={styles.oldPrice}>
                {selectedProduct.oldPrice}
              </span>
            </p>
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
