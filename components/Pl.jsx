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
    <div className="flex justify-center items-center p-8 overflow-hidden">
      {/* Horizontal scrollable grid */}
      <div className="flex flex-row flex-wrap gap-6 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center flex-shrink-0 w-44 snap-start"
          >
            <video
              src={product.videoSrc}
              autoPlay
              loop
              muted
              className="w-20 h-20 bg-white bg-opacity-80 rounded-full object-cover border-2 border-gray-300 cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleVideoClick(product.videoSrc)}
            />
            <h3 className="mt-2 mb-1 text-base font-bold">{product.title}</h3>
            <p className="m-0 text-sm text-gray-600">{product.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Modal overlay and iframe */}
      {iframeSrc && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeIframe}
          />

          {/* Modal container */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[70vh] max-h-[500px] bg-white bg-opacity-95 rounded-xl shadow-2xl z-50 overflow-hidden">
            <iframe
              src={iframeSrc}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white border border-red-500 rounded-md px-3 py-1 cursor-pointer text-sm font-bold transition-colors"
              onClick={closeIframe}
            >
              ✕
            </button>
          </div>
        </>
      )}

      {/* Custom styles for mobile */}
      <style jsx>{`
        @media (max-width: 600px) {
          .w-44 {
            width: 150px;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Pl;
