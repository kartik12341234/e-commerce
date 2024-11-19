import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Headerphone from "@/components/Headerphone";
import Know from "@/components/know";
import CertificationSlider from "@/components/Certi";
export const metadata = {
  title: "OIL Site",
  description: "a oil site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
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
