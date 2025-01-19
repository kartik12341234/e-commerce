import Image from "next/image";

export default function ImpactSection() {
  const cards = [
    {
      title: "JOURNEY TOWARDS SUSTAINABILITY",
      featured: "Featured on GQ India",
      imgSrc:
        "https://twobrothersindiashop.com/cdn/shop/files/May_2022_500x.jpg?v=1681223114", // Replace with actual path
      link: "#",
    },
    {
      title: "EMPOWERING 9000 FARMERS",
      featured: "Featured on YourStory",
      imgSrc:
        "https://twobrothersindiashop.com/cdn/shop/files/May_2022_500x.jpg?v=1681223114", // Replace with actual path
      link: "#",
    },
    {
      title: "TOWARDS JOY: THE BIG SWITCH",
      featured: "Featured on TheBetterIndia",
      imgSrc:
        "https://twobrothersindiashop.com/cdn/shop/files/May_2022_500x.jpg?v=1681223114", // Replace with actual path
      link: "#",
    },
  ];

  return (
    <div style={{ backgroundColor: "#7D2227", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "2rem" }}>
        IMPACT & RECOGNITION
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              width: "30%",
              marginBottom: "2rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={card.imgSrc}
              alt={card.title}
              width={400}
              height={250}
              objectFit="cover"
            />
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                {card.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {card.featured}
              </p>
              <a
                href={card.link}
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#2E5530",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                READ MORE
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
