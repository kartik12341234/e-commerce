import React from "react";
import { ChevronRight, ArrowRight, Leaf, Users, Heart } from "lucide-react";
import AboutSection from "@/components/Ab";
import ImpactSection from "./Imapctsection";

const page = () => {
  const metrics = [
    { number: "9000+", label: "Farmers Empowered" },
    { number: "100%", label: "Organic Farming" },
    { number: "0", label: "Plastic Used" },
  ];

  return (
    <div className="w-full bg-white">
      <div style={{ height: "50vh", width: "100%", overflow: "hidden" }}>
        <video
          autoPlay
          muted
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source
            src="https://www.anveshan.farm/cdn/shop/files/quinn_vcvfcms6gldxqua1nbfyiqgi.mp4#t=0.1"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <AboutSection></AboutSection>
      {/* Hero Section */}
      <section className="relative h-96 bg-green-900 mt-[-10%]">
        <div className="absolute inset-0">
          <img
            src="https://twobrothersindiashop.com/cdn/shop/files/Mask_group_cc21733a-1218-4492-b749-113e1c08283f.png?v=1679063330&width=1000"
            alt="Organic farming"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Who We Are and What We Stand For
            </h1>
            <p className="text-xl">
              4th generation farmers bringing sustainable organic farming
              practices to create a healthier planet and healthier people.
            </p>
          </div>
        </div>
      </section>

      {/* How We Started */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-8">
            How We Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg ">
              <img
                src="https://twobrothersindiashop.com/cdn/shop/files/Mask_group_cc21733a-1218-4492-b749-113e1c08283f.png?v=1679063330&width=1000"
                alt="Our beginnings"
                className="w-full h-84 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://twobrothersindiashop.com/cdn/shop/files/Mask_group_cc21733a-1218-4492-b749-113e1c08283f.png?v=1679063330&width=1000"
                alt="Farm growth"
                className="w-full h-84 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://twobrothersindiashop.com/cdn/shop/files/Mask_group_cc21733a-1218-4492-b749-113e1c08283f.png?v=1679063330&width=1000"
                alt="Current farm"
                className="w-full h-84 object-cover"
              />
            </div>
          </div>
          <button className="mt-8 bg-green-800 text-white px-6 py-2 rounded-md flex items-center">
            View More <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                To revolutionize farming practices while empowering local
                communities and delivering pure, organic products to every
                household.Our soil is worth its weight in gold. We wish to leave
                it in a better shape than when we received it. We want it to
                breathe, to live, to sustain life. The reason for our
                regenerative Our soil is worth its weight in gold. We wish to
                leave it in a better shape than when we received it. We want it
                to breathe, to live, to sustain life. The reason for our
                regenerative fOur soil is worth its weight in gold. We wish to
                leave it in a better shape than when we received it. We want it
                to breathe, to live, to sustain life. The reason for our
                regenerative leave it in a better shape than when we received
                it. We want it to breathe, to live, to sustain life. The reason
                for our regenerative fOur soil is worth its weight in gold. We
                wish to leave it in a better shape than when we received it. We
                want it to breathe, to live, to sustain life. The reason for our
                regenerative f
              </p>
              <button className="bg-green-800 text-white px-6 py-2 rounded-md flex items-center">
                View Our Vision <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://twobrothersindiashop.com/cdn/shop/files/Mask_group_cc21733a-1218-4492-b749-113e1c08283f.png?v=1679063330&width=1000"
                alt="Our mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* From Soil to Soul */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-8">
            From Soil to Soul
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Organic Farming</h3>
              <p className="text-gray-600">Pure and natural from the start</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Community First</h3>
              <p className="text-gray-600">Supporting local farmers</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Quality Promise</h3>
              <p className="text-gray-600">No compromises ever</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Quality Promise</h3>
              <p className="text-gray-600">No compromises ever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold mb-2">{metric.number}</h3>
                <p className="text-xl">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ImpactSection></ImpactSection>

      {/* Join Us CTA */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Join Us in Revolutionizing India
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Be part of the movement towards sustainable farming and healthier
            living
          </p>
          <button className="bg-green-800 text-white px-8 py-3 rounded-md flex items-center mx-auto">
            Join the Movement <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default page;
