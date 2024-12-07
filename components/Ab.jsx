"use client";
import "./ab.css";

const AboutSection = () => {
  return (
    <section className="about-section">
      {/* Left Side Image */}
      <div className="about-left">
        <img
          src="https://twobrothersindiashop.com/cdn/shop/files/1_3_e8df342f-3491-4716-b708-5f9ef476e084_403x_crop_center.png?v=1673856507"
          width={200}
          height={200}
          alt="Farmer Image 1"
        />
      </div>

      {/* Center Text */}
      <div className="about-center">
        <h1 className="about-heading">WE ARE 5TH GEN FARMERS</h1>
        <p className="about-text">
          Our farm is a vibrant and sustainable ecosystem, certified organic and
          powered by generations of expertise. Located in a serene rural
          setting, every purchase helps us nurture the planet and create a
          sustainable future for all.
        </p>
      </div>

      {/* Right Side Image */}
      <div className="about-right">
        <img
          src="https://twobrothersindiashop.com/cdn/shop/files/2_3_14d156ea-189f-4665-80f0-4187b0c61b72_441x_crop_center.png?v=1673856581"
          width={200}
          height={200}
          alt="Farmer Image 2"
        />
      </div>
    </section>
  );
};

export default AboutSection;
