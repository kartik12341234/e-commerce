import { Search, ShoppingBag, User } from "lucide-react";
import React, { useState } from "react";
import { FaFacebook, FaHamburger, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function MobileTop() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          width: "100%",
          height: "50px",
          justifyContent: "space-between",
          padding: "0 20px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <FaHamburger
            onClick={toggleMenu}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
          />
        </div>
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          OIL Organic
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <Search style={{ cursor: "pointer", fontSize: "1.2rem" }} />
          <Link href="/cart">
            <ShoppingBag style={{ cursor: "pointer", fontSize: "1.2rem" }} />
          </Link>
          <Link href="/login">
            <User style={{ cursor: "pointer", fontSize: "1.2rem" }} />
          </Link>
        </div>
      </div>

      {/* Side Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "70%",
            zIndex: "10000",
            height: "100%",
            backgroundColor: "#f9f9f9",
            zIndex: 1000,
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
              Menu
            </h3>
            <button
              onClick={toggleMenu}
              style={{
                border: "none",
                background: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { text: "All Products", href: "/" },
              { text: "B2G1 SALE", href: "/sale" },
              { text: "A2 Ghee", href: "/a2-ghee" },
              { text: "Wood-Pressed Oils", href: "/wood-pressed-oils" },
              { text: "Shop", href: "/shop" },
              { text: "Sampler Kits", href: "/kits" },
              { text: "Blogs", href: "/blogs" },
              { text: "Rewards", href: "/rewards" },
            ].map((item, index) => (
              <li key={index} style={{ marginBottom: "15px" }}>
                <Link href={item.href}>
                  <span
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      fontSize: "1rem",
                      fontWeight: "500",
                      display: "block",
                      padding: "10px 0",
                      borderBottom: "1px solid #ddd",
                      transition: "color 0.3s",
                    }}
                  >
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: "-10px",
              paddingTop: "20px",
              borderTop: "1px solid #ddd",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold" }}>Connect Us </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "10px",
              }}
            >
              <Link href="/facebook">
                <FaFacebook
                  style={{
                    fontSize: "1.5rem",
                    color: "#4267B2",
                    cursor: "pointer",
                  }}
                />
              </Link>
              <Link href="/instagram">
                <FaInstagram
                  style={{
                    fontSize: "1.5rem",
                    color: "#E4405F",
                    cursor: "pointer",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
