// app/gallery/page.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Leaf,
  Sun,
  ShoppingBag,
  Cookie,
} from "lucide-react";
// import GalleryPagess from "./Hello";

const galleryData = [
  {
    id: 1,
    type: "image",
    src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_4_2_9d54643e-a00b-4547-b720-8aefb09177eb.png?v=1681203435&width=800",
    alt: "Planting Seeds",
    title: "Planting the First Seed",
    description:
      "This was our first step into organic farming in 2012. We carefully selected heirloom seeds and prepared the soil using traditional methods, setting the foundation for our sustainable farming practices.",
    icon: Leaf,
  },
  {
    id: 2,
    type: "image",
    src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_1_1.jpg?v=1681222315&width=800",
    alt: "Harvesting",
    title: "First Organic Harvest",
    description:
      "Our inaugural harvest marked a milestone in our journey. The organic crops exceeded expectations in both quality and yield, proving that sustainable farming can be commercially viable.",
    icon: Sun,
  },
  {
    id: 3,
    type: "video",
    src: "https://www.anveshan.farm/cdn/shop/files/quinn_vcvfcms6gldxqua1nbfyiqgi.mp4#t=0.1",
    alt: "Market Day",
    title: "Taking Products to Market",
    description:
      "Bringing our organic products directly to local markets created a direct connection with our community. This helped us understand consumer needs and preferences firsthand.",
    icon: ShoppingBag,
  },
  {
    id: 4,
    type: "image",
    src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_4_2_9d54643e-a00b-4547-b720-8aefb09177eb.png?v=1681203435&width=800",
    alt: "Recipe Development",
    title: "Creating Healthy Recipes",
    description:
      "We began developing recipes to help our customers make the most of our organic produce. Each recipe was crafted to maintain the nutritional value of our ingredients.",
    icon: Cookie,
  },
];

const GalleryPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [hoveredText, setHoveredText] = useState(null);
  const galleryRef = useRef(null);
  const textRefs = useRef([]);
  const router = useRouter();

  // Add the toggleFullscreen function
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (galleryRef.current.requestFullscreen) {
        galleryRef.current.requestFullscreen();
      } else if (galleryRef.current.webkitRequestFullscreen) {
        galleryRef.current.webkitRequestFullscreen();
      } else if (galleryRef.current.msRequestFullscreen) {
        galleryRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
    setAutoplay(false);
  };

  // Add fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    if (autoplay && !hoveredText) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryData.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [autoplay, hoveredText]);

  const handleTextHover = (index) => {
    setHoveredText(index);
    setCurrentSlide(index);
    setAutoplay(false);
  };

  const handleTextLeave = () => {
    setHoveredText(null);
    setAutoplay(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <motion.div
          className="text-center py-12 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Visualizing Our Process</h1>
          <p className="text-xl text-gray-600">
            Every frame captures a part of our journey
          </p>
        </motion.div>

        {/* Gallery Section */}
        <div
          ref={galleryRef}
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {galleryData[currentSlide].type === "image" ? (
                <Image
                  src={galleryData[currentSlide].src}
                  alt={galleryData[currentSlide].alt}
                  fill
                  className="object-cover"
                  onClick={toggleFullscreen}
                />
              ) : (
                <video
                  src={galleryData[currentSlide].src}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                <p className="text-lg">{galleryData[currentSlide].alt}</p>
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={() => {
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + galleryData.length) % galleryData.length
                  );
                  setAutoplay(false);
                }}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => {
                  setCurrentSlide((prev) => (prev + 1) % galleryData.length);
                  setAutoplay(false);
                }}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                setAutoplay(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
            >
              <Maximize2 size={24} />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {galleryData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setAutoplay(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8">
            {galleryData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  ref={(el) => (textRefs.current[index] = el)}
                  className={`p-6 rounded-lg transition-all duration-300 ${
                    index === currentSlide || hoveredText === index
                      ? "bg-green-50 scale-102"
                      : "hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => handleTextHover(index)}
                  onMouseLeave={handleTextLeave}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {`Slide ${index + 1}: ${item.title}`}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <GalleryPagess></GalleryPagess> */}
    </>
  );
};

export default GalleryPage;
