import Main from "@/components/Main/Main";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
import Know from "@/components/know";
import Homeproduct from "@/components/Homeproduct";
import CertificationSlider from "@/components/Certi";
import Productpage from "@/components/Productpage";
import AboutSection from "@/components/Ab";
export default function Home() {
  return (
    <div>
      <Main></Main>
      <AboutSection></AboutSection>
      <Homeproduct></Homeproduct>
      <Productpage></Productpage>
      <WhyChooseUs></WhyChooseUs>
      <Know></Know>
      {/* <CertificationSlider></CertificationSlider> */}
    </div>
  );
}
