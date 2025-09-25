import React, { useState , useRef ,useEffect } from "react";

import { products } from "./video";
const Pl = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);

  const handleVideoClick = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Pause all thumbnail videos
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
      }
    });
    
    setSelectedVideo(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Pause modal video if playing
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleThumbnailHover = (index, isHovering) => {
    const video = videoRefs.current[index];
    if (video) {
      if (isHovering) {
        video.play().catch(() => {
          // Handle autoplay restrictions
        });
      } else {
        video.pause();
      }
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="flex justify-center items-center p-8 overflow-hidden z-999">
        {/* Horizontal scrollable grid */}
        <div className="flex flex-row flex-wrap gap-6 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center flex-shrink-0 w-44 snap-start"
            >
              {/* Clickable container wrapper */}
              <div
                className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg border-3 border-gray-200 hover:border-blue-400 bg-white group"
                onClick={(e) => handleVideoClick(product, e)}
                onMouseEnter={() => handleThumbnailHover(index, true)}
                onMouseLeave={() => handleThumbnailHover(index, false)}
              >
                <video
                  ref={(el) => videoRefs.current[index] = el}
                  src={product.videoSrc}
                  poster={product.poster}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  controls={false}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  onContextMenu={(e) => e.preventDefault()}
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-gray-800 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="mt-3 mb-1 text-base font-bold text-gray-800">{product.title}</h3>
              <p className="m-0 text-sm text-gray-600 leading-relaxed">{product.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal container */}
          <div className="relative w-full max-w-3xl max-h-[80vh] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 flex flex-col">
            {/* Header */}
           
            {/* Video container */}
            <div className="relative bg-black flex-1 min-h-0 flex items-center justify-center">
              <video
                ref={modalVideoRef}
                src={selectedVideo.videoSrc}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
                poster={selectedVideo.poster}
                style={{ minHeight: '300px' }}
              />
            </div>

          
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .w-44 {
            width: 140px;
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        video {
          -webkit-tap-highlight-color: transparent;
        }

        /* Custom keyboard key styling */
        kbd {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Animation classes */
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-enter {
          animation: modalSlideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Pl;