// import img from "next/img";
"use client";
const AboutSection = () => {
  return (
    <section
      style={{
        marginTop: "-10rem",
        marginBottom: "8rem",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#FFF4EC",
        padding: "10px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Left Side img */}
      <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
        <img
          src="https://twobrothersindiashop.com/cdn/shop/files/1_3_e8df342f-3491-4716-b708-5f9ef476e084_403x_crop_center.png?v=1673856507"
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Center Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "2",
          gap: "20px",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#174D3B",
            marginBottom: "20px",
          }}
        >
          WE ARE 5TH GEN FARMERS
        </h1>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#174D3B",
            lineHeight: "1.8",
          }}
        >
          Our farm is a vibrant and sustainable ecosystem, certified organic and
          powered by generations of expertise. Located in a serene rural
          setting, Every purchase helps us nurture the planet and create a
          sustainable future for all.
        </p>
      </div>

      {/* Right Side img */}
      <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
        <img
          src="https://twobrothersindiashop.com/cdn/shop/files/2_3_14d156ea-189f-4665-80f0-4187b0c61b72_441x_crop_center.png?v=1673856581"
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            flex-direction: column;
            align-items: center;
            margin-top: -2rem;
            margin-bottom: 4rem;
          }
          h1 {
            font-size: 2rem;
            text-align: center;
          }
          p {
            font-size: 1rem;
            padding: 0 10px;
          }
          img {
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.8rem;
          }
          p {
            font-size: 0.9rem;
          }
          img {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
