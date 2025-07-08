// app/about/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

// DynamicGallery Component with autoplay (unchanged)
const DynamicGallery = ({ items, autoplay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [items.length, autoplay]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`w-full flex-shrink-0 ${
              index === currentIndex ? "block" : "hidden"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[500px]">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover rounded-lg"
                  controls
                />
              )}
              {item.overlay && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {item.overlay.title}
                    </h3>
                    <p className="text-lg">{item.overlay.description}</p>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-4 text-lg text-gray-600">{item.caption}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// SustainabilityBanner Component (unchanged)
const SustainabilityBanner = () => {
  return (
    <motion.div
      className="relative h-48 bg-green-600 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <h3 className="text-3xl font-bold mb-4">No Plastic. Only Organic.</h3>
          <p className="text-xl mb-4">Our commitment to a sustainable future</p>
          <button className="px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors">
            View More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// JoinMovement Component (unchanged)
const JoinMovement = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <h3 className="text-2xl font-bold mb-6">
        Join Us in Revolutionizing India
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg">
            Subscribe
          </button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Partner With Us</h4>
          <p className="mb-4">Become a distributor or partner</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg">
            Join as Partner
          </button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h4 className="text-xl font-semibold mb-4">Support Our Cause</h4>
          <p className="mb-4">Shop or share our mission</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
};

// Main AboutPage Component
const AboutPage = () => {
  const router = useRouter();

  // Sample data structure for all sections
  const sections = {
    howWeStarted: {
      title: "How We Started",
      items: [
        {
          id: 1,
          type: "image",
          src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_4_2_9d54643e-a00b-4547-b720-8aefb09177eb.png?v=1681203435&width=800",
          alt: "First farm",
          caption: "Our first organic farm in 2020",
        },
        {
          id: 2,
          type: "video",
          src: "https://www.anveshan.farm/cdn/shop/files/quinn_vcvfcms6gldxqua1nbfyiqgi.mp4#t=0.1",
          caption: "The journey of our first harvest",
        },
      ],
      cta: "View More",
    },
    ourStory: {
      title: "Our Story",
      items: [
        {
          id: 1,
          type: "image",
          src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_4_2_9d54643e-a00b-4547-b720-8aefb09177eb.png?v=1681203435&width=800",
          alt: "Community",
          caption: "Working with local farmers",
        },
      ],
      cta: "Find Out More",
    },
    missionVision: {
      title: "Mission and Vision",
      items: [
        {
          id: 1,
          type: "image",
          src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_1_1.jpg?v=1681222315&width=800",
          alt: "Our Mission",
          overlay: {
            title: "Our Mission",
            description:
              "Creating sustainable farming solutions for a better tomorrow",
          },
        },
      ],
      cta: "View Our Vision",
    },
    founders: {
      title: "Meet the Founders",
      items: [
        {
          id: 1,
          type: "image",
          src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_4_2_9d54643e-a00b-4547-b720-8aefb09177eb.png?v=1681203435&width=800",
          alt: "Founder 1",
          caption: "John Doe - CEO & Co-founder",
        },
      ],
      cta: "Know More About Us",
    },
    whyUs: {
      title: "How Are We Doing It Differently?",
      items: [
        {
          id: 1,
          type: "image",
          src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_1_1.jpg?v=1681222315&width=800",
          alt: "Innovation",
          caption: "Our innovative farming practices",
        },
      ],
      cta: "Discover the Difference",
    },
    soilToSoul: {
      title: "From Soil to Soul",
      items: [
        {
          id: 1,
          type: "image",
          src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_4_2_9d54643e-a00b-4547-b720-8aefb09177eb.png?v=1681203435&width=800",
          alt: "Our Process",
          caption: "From farm to your table",
        },
      ],
      cta: "Taste the Difference",
    },
  };

  // Function to render each section
  const renderSection = (key, data) => (
    <section
      className="py-16"
      key={key}
      style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <motion.div
        style={{ textAlign: "center", width: "100%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-8">{data.title}</h2>
        <DynamicGallery items={data.items} />
        <button
          onClick={() => router.push(`/about/${key}`)}
          className="px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
          style={{
            backgroundColor: "#00574b",
            color: "#fff",
            marginTop: "20px",
            width: "400px",
          }}
        >
          {data.cta}
        </button>
      </motion.div>
    </section>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-4">
          Who We Are and What We Stand For
        </h1>
        <p className="text-xl text-gray-600">
          Revolutionizing sustainable farming in India
        </p>
      </motion.div>

      {/* Dynamic Sections */}
      {Object.entries(sections).map(([key, data]) => renderSection(key, data))}

      {/* Sustainability Banner */}
      <SustainabilityBanner />

      {/* Join Movement Section */}
      <section className="py-16">
        <JoinMovement />
      </section>

      {/* Behind the Scenes */}
      <section className="py-16">
        <h2 className="text-4xl font-bold mb-8">Behind the Scenes</h2>
        <DynamicGallery
          items={[
            {
              id: 1,
              type: "image",
              src: "https://twobrothersindiashop.com/cdn/shop/files/Untitled_design_1_1.jpg?v=1681222315&width=800",
              alt: "Behind the Scenes",
              caption: "Our team at work",
            },
          ]}
        />
        <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Take a Closer Look
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
