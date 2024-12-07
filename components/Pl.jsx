import React, { useState } from "react";
import { products } from "./video";

const Pl = () => {
  const [iframeSrc, setIframeSrc] = useState(null);

  const handleVideoClick = (src) => {
    setIframeSrc(src);
  };

  const closeIframe = () => {
    setIframeSrc(null);
  };

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
              onClick={() => handleVideoClick(product.videoSrc)}
            ></video>
            <h3>{product.title}</h3>
            <p>{product.subtitle}</p>
          </div>
        ))}
      </div>

      {iframeSrc && (
        <div className="iframe-container">
          <iframe
            src={iframeSrc}
            frameBorder="0"
            allowFullScreen
            className="iframe"
          ></iframe>
          <button className="close-button" onClick={closeIframe}>
            Close
          </button>
        </div>
      )}

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
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          object-fit: cover;
          overflow: hidden;
          border: 2px solid #ccc;
          cursor: pointer;
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
        .iframe-container {
          position: fixed;
          background-color: rgba(255, 255, 255, 0.8);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          height: 450px;

          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          border-radius: 10px;
          overflow: hidden;
        }
        .iframe {
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: red;
          color: white;
          border: 1 px solid red;
          border-radius: 5%;

          padding: 0.2rem;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
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
