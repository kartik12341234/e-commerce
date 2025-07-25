"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { House, Store, Puzzle, ShoppingCart, CircleEllipsis, User, MenuSquare } from "lucide-react";
import "./headerphone.css";

const mobileMenuItems = [
  { name: "Home", icon: <House size={22} />, path: "/" },
  { name: "All Products", icon: <Store size={22} />, path: "/allproduct" },
  { name: "Categories", icon: <Puzzle size={22} />, path: "/items" },
  { name: "Cart", icon: <ShoppingCart size={22} />, path: "/cart" },
  { name: "My Orders", icon: <CircleEllipsis size={22} />, path: "/myorders" },
  { name: "Account", icon: <User size={22} />, path: "/register" },
];

const Headerphone = () => {
  const [pic, setPic] = useState("");
  const [userId, setUserId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [menu, setMenu] = useState(false); // Toggle for the mobile menu
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  return (
    <header className="header-containerkk">

      {/* ...rest of your component code... */}
    </header>
  );
};

export default Headerphone;
