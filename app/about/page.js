// app/about/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImpactSection from "./Imapctsection";

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
  const [modalSection, setModalSection] = useState(null);

  // Sample data structure for all sections
  const sections = {
    howWeStarted: {
      title: "How We Started",
      subtitle: "From a single farm to a movement",
      description:
        "In 2020, we began our journey with a vision to revolutionize sustainable farming in India. Our first organic farm set the foundation for what would become a nationwide movement.",
      icon: "🌱",
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
      subtitle: "Empowering communities, one farm at a time",
      description:
        "We work hand-in-hand with local farmers, providing them with resources, training, and a platform to sell their organic produce. Our story is one of collaboration and shared success.",
      icon: "🤝",
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
      subtitle: "A sustainable future for all",
      description:
        "Our mission is to create sustainable farming solutions that benefit both people and the planet. We envision a world where organic, ethical food is accessible to everyone.",
      icon: "🌏",
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
      subtitle: "The people behind the movement",
      description:
        "Our founders are passionate advocates for organic farming and rural empowerment. Their leadership and vision have inspired a new generation of farmers.",
      icon: "👩‍🌾",
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
      subtitle: "Innovation at every step",
      description:
        "We use innovative farming practices, technology, and community engagement to ensure the highest quality produce and a positive impact on the environment.",
      icon: "💡",
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
      subtitle: "Farm to table, the organic way",
      description:
        "Our process ensures that every product is pure, organic, and full of nutrition. From the soil to your soul, we deliver health and happiness.",
      icon: "🍃",
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
    <div
      key={key}
      className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group"
      style={{ minHeight: 420, maxWidth: 420, margin: 'auto' }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{data.icon}</span>
        <h2 className="text-2xl font-bold group-hover:text-green-700 transition-colors">{data.title}</h2>
      </div>
      <div className="text-green-900 text-lg mb-2 font-semibold">{data.subtitle}</div>
      <div className="text-gray-600 mb-4 text-center">{data.description}</div>
      <div className="w-full flex justify-center mb-2">
        <div style={{ width: '100%', maxWidth: 320, aspectRatio: '4/3', position: 'relative' }}>
          <DynamicGallery items={data.items} />
        </div>
      </div>
      <button
        onClick={() => router.push(`/about/${key}`)}
        className="px-7 py-2 rounded-lg bg-green-600 text-white font-semibold mt-5 hover:bg-green-700 transition-colors shadow"
        style={{ width: 'min(250px, 90vw)' }}
      >
        {data.cta}
      </button>
    </div>
  );

  // Modal for dynamic section details
  const renderModal = () => {
    if (!modalSection) return null;
    const { key, data } = modalSection;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeInUp">
          <button
            onClick={() => setModalSection(null)}
            className="absolute top-3 right-3 text-gray-500 hover:text-green-700 text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
          <DynamicGallery items={data.items} autoplay={false} />
          {data.items[0]?.caption && (
            <p className="mt-4 text-gray-700 text-center">{data.items[0].caption}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {renderModal()}
      {/* Title Section */}
      <motion.div
        className="text-center py-12 md:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Who We Are and What We Stand For
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Revolutionizing sustainable farming in India
        </p>
      </motion.div>
      {/* Clustered Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 my-12">
        {Object.entries(sections).map(([key, data]) => renderSection(key, data))}
      </div>
      {/* Impact Section */}
      <div className="my-12 md:my-20">
        <ImpactSection />
      </div>

      {/* Sustainability Banner */}
      <div className="my-12 md:my-20">
        <SustainabilityBanner />
      </div>

      {/* Join Movement Section */}
      <section className="py-12 md:py-20">
        <JoinMovement />
      </section>

      {/* Behind the Scenes */}
      <section className="py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Behind the Scenes</h2>
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
        <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
          Take a Closer Look
        </button>
      </section>
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
