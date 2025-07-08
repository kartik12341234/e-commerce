"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Heart, LogIn, Search, ShoppingBag, UserPen } from "lucide-react";

const navigation = {
  categories: [
    {
      id: "Products",
      name: "Products",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://www.anveshan.farm/cdn/shop/files/moringa_safron.jpg?v=1727333767&width=360",
          imageAlt: "Moringa and saffron products.",
        },
        {
          name: "Basic oils",
          href: "#",
          imageSrc:
            "https://www.anveshan.farm/cdn/shop/files/anveshan-hallikar-cow-ghee_500g.jpg?v=1722855359&width=360",
          imageAlt: "Close up of various oils.",
        },
      ],
      sections: [
        {
          id: "oil",
          name: "Oil",
          items: [
            { name: "Sunflower Oil", href: "#" },
            { name: "Coconut Oil", href: "#" },
            { name: "Olive Oil", href: "#" },
            { name: "Almond Oil", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Brand A", href: "#" },
            { name: "Brand B", href: "#" },
            { name: "Brand C", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function Header() {
  const dropdownData = {
    Categories: [
      { name: "Fruits", path: "/items" },
      { name: "Vegetables", path: "/categories/vegetables" },
      { name: "Spices", path: "/categories/spices" },
      { name: "Grains", path: "/categories/grains" },
    ],
    "All Product": [
      { name: "Ghee", path: "/allproduct" },
      { name: "Oils", path: "/allproduct" },
      { name: "Millets", path: "/allproduct" },
      { name: "Deals", path: "/allproduct" },
    ],
    "About us": [
      { name: "Company Info", path: "/about" },
      { name: "Our Team", path: "/about/our-team" },
      { name: "Mission", path: "/about/mission" },
    ],

    blogs: [
      { name: "recipe", path: "/reciepe" },
      { name: "Mumbai", path: "/stores/mumbai" },
      { name: "Bangalore", path: "/stores/bangalore" },
      { name: "Chennai", path: "/stores/chennai" },
    ],
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleHover = (label) => {
    setActiveDropdown(label);
  };

  const handleLeave = () => {
    setActiveDropdown(null);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="hm" style={{ zIndex: "10000" }}>
      <div className=" relative z-10000">
        <header className="relative ">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="lg:hidden bg-white p-2 text-gray-400"
                >
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link href="/">
                    <span className="sr-only">Your Company</span>
                    <img src="file.svg" alt="" className="h-8 w-auto" />
                  </Link>
                </div>

                {/* Flyout menus */}
                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover
                        key={category.name}
                        className="flex"
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition duration-200 hover:text-gray-800">
                          {category.name}
                        </PopoverButton>

                        <PopoverPanel
                          className="absolute inset-x-0 top-full text-sm text-gray-500 transition-opacity duration-200"
                          static={open}
                        >
                          <div className="absolute inset-0 top-1/2 bg-white shadow" />
                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-8">
                              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base"
                                    >
                                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <img
                                          src={item.imageSrc}
                                          alt={item.imageAlt}
                                          className="object-cover"
                                        />
                                      </div>
                                      <Link
                                        href="#"
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        {item.name}
                                      </Link>
                                    </div>
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p className="font-medium text-gray-900">
                                        {section.name}
                                      </p>
                                      <ul className="mt-6 space-y-6">
                                        {section.items.map((item) => (
                                          <li
                                            key={item.name}
                                            className="flow-root"
                                          >
                                            <a
                                              href={item.href}
                                              className="text-gray-500"
                                            >
                                              {item.name}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    ))}
                    <div
                      style={{
                        marginLeft: "150px",
                        fontWeight: "500",
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        gap: "160px",
                      }}
                    >
                      <div
                        className="midshow"
                        style={{
                          display: "flex",
                          gap: "30px",
                          position: "relative",
                        }}
                      >
                        {Object.keys(dropdownData).map((label) => (
                          <div
                            key={label}
                            style={{ position: "relative" }}
                            onMouseEnter={() => handleHover(label)}
                            onMouseLeave={handleLeave}
                          >
                            <h6
                              style={{
                                color: "#2d3748",
                                cursor: "pointer",
                                margin: "0",
                              }}
                            >
                              {label}
                            </h6>
                            {activeDropdown === label && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "30px",
                                  left: "0",
                                  backgroundColor: "#fff",
                                  border: "1px solid #ccc",
                                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                  borderRadius: "5px",
                                  zIndex: "1000",
                                  minWidth: "150px",
                                  padding: "10px",
                                }}
                              >
                                {dropdownData[label].map((item, index) => (
                                  <Link href={item.path} key={index} passHref>
                                    <p
                                      style={{
                                        margin: "5px 0",
                                        fontSize: "14px",
                                        color: "#2d3748",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {item.name}
                                    </p>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Other side of the menu */}
                      <div
                        className="leftsh"
                        style={{
                          display: "flex",
                          gap: "30px",
                        }}
                      >
                        {/* Search Box */}
                        <div className="dii" style={{ display: "flex" }}>
                          <input
                            type="text"
                            placeholder="🔍Search here"
                            style={{
                              width: "120px",
                              height: "30px",
                              border: "1px solid #2d3748",
                              borderRadius: "0px",
                            }}
                          />
                        </div>

                        {/* Other Links */}
                        <a
                          href="/register"
                          style={{ color: "#2d3748", cursor: "pointer" }}
                        >
                          <UserPen></UserPen>
                        </a>
                        <a
                          href="/cart"
                          style={{ color: "#2d3748", cursor: "pointer" }}
                        >
                          ❤️
                        </a>
                        <a
                          href="/myorders"
                          style={{ color: "#2d3748", cursor: "pointer" }}
                        >
                          🛒
                        </a>
                      </div>
                    </div>
                  </div>
                </PopoverGroup>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
