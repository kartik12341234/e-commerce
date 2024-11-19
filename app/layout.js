import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Headerphone from "@/components/Headerphone";
import Know from "@/components/know";
import CertificationSlider from "@/components/Certi";
import IconMenu from "@/components/IconMenu";
import Coupon from "@/components/Coupon";
export const metadata = {
  title: "OIL Site",
  description: "a oil site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="cou">
          <Coupon></Coupon>
        </div>
        <div className="mobi">
          <Header></Header>
        </div>
        <IconMenu></IconMenu>
        {children}
        <div className="forphone">
          <Headerphone />
        </div>

        <CertificationSlider></CertificationSlider>
        <Footer></Footer>
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
