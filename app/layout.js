import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Headerphone from "@/components/Headerphone";

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
        <Footer></Footer>
      </body>
    </html>
  );
}
