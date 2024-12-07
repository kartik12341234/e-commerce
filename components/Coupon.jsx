"use client";
import React, { useState } from "react";
import Header from "./Header";
// import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link";
export default function Coupon() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // Initialize router

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Array of products with names and URLs
  const products = [
    { name: "Sunflower Oil", link: "/products/sunflower-oil" },
    { name: "Coconut Oil", link: "/products/coconut-oil" },
    { name: "Olive Oil", link: "/products/olive-oil" },
    { name: "Almond Oil", link: "/products/almond-oil" },
  ];

  const handleProductClick = (link) => {
    setMenuOpen(false); // Close menu on click
    router.push(link); // Navigate to the product link
  };

  return (
    <div className="coupon">
      <Link href="/allproduct">
        {/* Top Banner */}
        <p className="flex h-10 items-center justify-center bg-black text-sm font-medium text-white">
          Get free delivery on orders over ₹400/- Get first order at 20% off
        </p>
      </Link>

      {/* Mobile Only Section */}

      {/* Mobile Menu */}

      {/* Overlay */}
    </div>
  );
}
