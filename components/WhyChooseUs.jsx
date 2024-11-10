import Image from "next/image"; // for optimized image rendering
import "./wcu.css";
const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="features">
        <div className="feature-item">
          <div className="icon">
            <img
              src="https://www.olixir.in/cdn/shop/files/Olixir_icons-march_23-02.png?v=1680761668&width=710"
              alt="Natural & Healthy oils"
            ></img>
          </div>
          <h3>Natural & Healthy oils</h3>
          <p>Bringing health in its purest form to our customers</p>
        </div>
        <div className="feature-item">
          <div className="icon">
            <img
              src="https://www.olixir.in/cdn/shop/files/Olixir_icons-march_23-02.png?v=1680761668&width=710"
              alt="Natural & Healthy oils"
            ></img>
          </div>
          <h3>Purest Ingredients</h3>
          <p>
            Carefully picked & sourced ingredients to make best oils for you
          </p>
        </div>
        <div className="feature-item">
          <div className="icon">
            <img
              src="https://www.olixir.in/cdn/shop/files/Olixir_icons-march_23-02.png?v=1680761668&width=710"
              alt="Natural & Healthy oils"
            ></img>
          </div>
          <h3>Fast Shipping</h3>
          <p>
            We offer fast shipping all over India, free shipping on orders above
            ₹400/-
          </p>
        </div>
        <div className="feature-item">
          <div className="icon">
            <img
              src="https://www.olixir.in/cdn/shop/files/Olixir_icons-march_23-02.png?v=1680761668&width=710"
              alt="Natural & Healthy oils"
            ></img>
          </div>
          <h3>Authentic Methods</h3>
          <p>
            Process of extraction is pure, meticulous. Our oils are carefully
            pressed and curated
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
