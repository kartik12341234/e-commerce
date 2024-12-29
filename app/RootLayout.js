"use client";

import { useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Headerphone from "@/components/Headerphone";
import Know from "@/components/know";
import CertificationSlider from "@/components/Certi";
import IconMenu from "@/components/IconMenu";
import Coupon from "@/components/Coupon";
import MobileTop from "@/components/MobileTop";

// export const metadata = {
//   title: "OIL Site",
//   description: "a oil site",
// };

export default function RootLayout({ children }) {
  useEffect(() => {
    // Inject Chatbase script after component mounts
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute("chatbotId", "LJgeex5iT14WzZN2vLH-H");
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    window.embeddedChatbotConfig = {
      chatbotId: "LJgeex5iT14WzZN2vLH-H",
      domain: "www.chatbase.co",
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="cou">
          <Coupon />
        </div>
        <div className="mooo">
          <MobileTop></MobileTop>
        </div>
        <div className="mobi">
          <Header />
        </div>
        <IconMenu />
        {children}
        <div className="forphone">
          <Headerphone />
        </div>
        <CertificationSlider />
        <Footer />

        {/* Chatbot iframe */}
        {/* <iframe
          src="https://www.chatbase.co/chatbot-iframe/LJgeex5iT14WzZN2vLH-H"
          width="100%"
          style={{ height: "100%", minHeight: "700px" }}
          frameBorder="0"
        ></iframe> */}
      </body>
    </html>
  );
}
