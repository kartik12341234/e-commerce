import Main from "@/components/Main/Main";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";
import Homeproduct from "@/components/Homeproduct";
export default function Home() {
  return (
    <div>
      <Main></Main>
      <Homeproduct></Homeproduct>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
