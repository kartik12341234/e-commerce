// import Main from "@/components/Main/Main";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
import Know from "@/components/know";
import Homeproduct from "@/components/Homeproduct";
import CertificationSlider from "@/components/Certi";
import Productpage from "@/components/Productpage";
import AboutSection from "@/components/Ab";
import Main from "@/corosol/Mainki/Main";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import Categories from "@/components/Categories";
import Bulk from "@/components/Bulk";
import Carousel from "@/components/Carouesal";
// import Main from "@/components/Main/Main";
export default function Home() {
  return (
    <div>
      {/* <Main></Main> */}
      <Carousel></Carousel>
      <AboutSection></AboutSection>
      <Homeproduct></Homeproduct>
      <div
        style={{
          position: "relative",

          backgroundColor: "#fff",

          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href="/allproduct">
          <button
            style={{
              backgroundColor: "#000", // Dark green color
              color: "#fff", // White text
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            SHOP ALL
          </button>
        </Link>
      </div>

      <Productpage></Productpage>
      <Categories></Categories>
      <div
        style={{
          position: "relative",

          backgroundColor: "#fff",

          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href="/allproduct">
          <button
            style={{
              backgroundColor: "#000", // Dark green color
              color: "#fff", // White text
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            SHOP ALL
          </button>
        </Link>
      </div>
      <WhyChooseUs></WhyChooseUs>

      <Testimonials></Testimonials>
      <Bulk></Bulk>
      <Know></Know>
      {/* <CertificationSlider></CertificationSlider> */}
    </div>
  );
}
