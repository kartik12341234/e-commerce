"use client";
import { useEffect, useState } from "react";
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

export default function RootLayout({ children }) {
  const [lightMode, setlightMode] = useState(false);

  useEffect(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setlightMode(savedTheme === "light");
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      }
    } else {
      // Check system preference
      const preferslight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      setlightMode(preferslight);
      if (preferslight) {
        document.documentElement.classList.add("light");
      }
    }

    // Chatbase script injection
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

  const toggleTheme = () => {
    const newTheme = !lightMode;
    setlightMode(newTheme);
    localStorage.setItem("theme", newTheme ? "light" : "light");
    if (newTheme) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <html lang="en" className={lightMode ? "" : "light"}>
      <body className="transition-colors duration-200 bg-white light:bg-black light:text-white">
        {/* Theme Toggle Button */}

        <div className="cou">
          <Coupon />
        </div>
        <div className="mooo">
          <MobileTop />
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
      </body>
    </html>
  );
}
