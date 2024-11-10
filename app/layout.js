import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

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
      </body>
    </html>
  );
}
