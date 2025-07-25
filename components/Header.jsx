import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  ListTree,
  ShoppingBag,
  Info,
  BookOpen,
  ChevronDown,
  User,
  ShoppingCart,
  Search,
} from "lucide-react";
import "./header.css";

const menuItems = [
  {
    name: "Products",
    icon: <Package size={18} />, // Products icon
    path: "/allproduct",
  },
  {
    name: "Categories",
    icon: <ListTree size={18} />,
    dropdown: [
      { name: "Fruits", icon: <ShoppingBag size={15} />, path: "/items" },
      { name: "Vegetables", icon: <ShoppingBag size={15} />, path: "/categories/vegetables" },
      { name: "Spices", icon: <ShoppingBag size={15} />, path: "/categories/spices" },
      { name: "Grains", icon: <ShoppingBag size={15} />, path: "/categories/grains" },
    ],
  },
  {
    name: "All Product",
    icon: <ShoppingBag size={18} />, // All Product icon
    path: "/allproduct",
  },
  {
    name: "About us",
    icon: <Info size={18} />, // About us icon
    dropdown: [
      { name: "Company Info", icon: <Info size={15} />, path: "/about" },
      { name: "Our Team", icon: <Info size={15} />, path: "/about/our-team" },
      { name: "Mission", icon: <Info size={15} />, path: "/about/mission" },
    ],
  },
  {
    name: "blogs",
    icon: <BookOpen size={18} />, // Blogs icon
    dropdown: [
      { name: "recipe", icon: <BookOpen size={15} />, path: "/reciepe" },
      { name: "Mumbai", icon: <BookOpen size={15} />, path: "/stores/mumbai" },
      { name: "Bangalore", icon: <BookOpen size={15} />, path: "/stores/bangalore" },
      { name: "Chennai", icon: <BookOpen size={15} />, path: "/stores/chennai" },
    ],
  },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleHover = (idx) => setActiveDropdown(idx);
  const handleLeave = () => setActiveDropdown(null);

  return (
    <header className="header-pro">
      <div className="header-inner compact">
        <Link href="/">
          <img src="/file.svg" alt="Logo" className="header-logo" />
        </Link>
        <nav className="header-nav compact">
          {menuItems.map((item, idx) => (
            <div
              key={item.name}
              className="nav-item-pro"
              onMouseEnter={() => item.dropdown && handleHover(idx)}
              onMouseLeave={handleLeave}
            >
              <Link
                href={item.path || "#"}
                className="nav-link-pro compact"
                tabIndex={0}
              >
                <span className="nav-icon-pro compact">{item.icon}</span>
                <span className="nav-text-pro compact">{item.name}</span>
                {item.dropdown && <ChevronDown size={13} className="chev" />}
              </Link>
              {item.dropdown && activeDropdown === idx && (
                <div className="dropdown-pro compact">
                  {item.dropdown.map((drop) => (
                    <Link href={drop.path} key={drop.name} className="dropdown-item-pro compact">
                      <span className="dropdown-icon-pro compact">{drop.icon}</span>
                      <span className="dropdown-text-pro compact">{drop.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="header-actions compact">
          <div className="search-box-pro compact">
            <Search size={15} />
            <input type="text" placeholder="Search..." />
          </div>
          <Link href="/register" className="action-icon-pro compact"><User size={16} /></Link>
          <Link href="/cart" className="action-icon-pro compact"><ShoppingCart size={16} /></Link>
        </div>
      </div>
    </header>
  );
}
