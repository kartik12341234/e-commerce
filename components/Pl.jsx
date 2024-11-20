// components/ProductList.js
import React from "react";
import { products } from "./video";

const Pl = () => {
  return (
    <div className="container">
      <div className="grid">
        {products.map((product, index) => (
          <div className="circle" key={index}>
            <video
              src={product.videoSrc}
              autoPlay
              loop
              muted
              className="video"
            ></video>
            <h3>{product.title}</h3>
            <p>{product.subtitle}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }
        .circle {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .circle .video {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          overflow: hidden;
          border: 2px solid #ccc;
        }
        h3 {
          margin: 0.5rem 0 0.2rem;
          font-size: 1rem;
          font-weight: bold;
        }
        p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }
        @media (max-width: 600px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default Pl;
