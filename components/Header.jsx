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
import { LogIn, Search, ShoppingBag } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  return (
    <div className="hm" style={{ zIndex: "10000" }}>
      <div className="bg-white relative z-10000">
        <header className="relative bg-white">
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
                      className="showing"
                      style={{
                        marginLeft: "100px",
                        // color: "#2d3748;",
                        fontWeight: "500",
                        marginTop: "20px",
                        width: "1000px",
                        display: "flex",
                        gap: "20px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link href="/items">
                        <h6 style={{ color: "#2d3748;" }}>Categories</h6>
                      </Link>
                      <Link href="/allproduct">
                        <h6 style={{ color: "#2d3748;" }}>All Product</h6>
                      </Link>
                      <h6 style={{ color: "#2d3748;" }}>About us </h6>
                      <h6 style={{ color: "#2d3748;" }}>About us </h6>
                      <h6 style={{ color: "#2d3748;" }}>contact-us</h6>
                      {/* <h6 style={{ color: "#2d3748;" }}>Brands</h6> */}
                      <h6 style={{ color: "#2d3748;" }}>Stores</h6>
                      <Link href={"/register"}>
                        <h6 style={{ color: "#2d3748;" }}>
                          <Search></Search>
                        </h6>
                      </Link>
                      <Link href={"/register"}>
                        <h6 style={{ color: "#2d3748;" }}>
                          <LogIn></LogIn>
                        </h6>
                      </Link>
                      <Link href={"/cart"}>
                        <h6 style={{ color: "#2d3748;" }}>
                          <ShoppingBag></ShoppingBag>
                        </h6>
                      </Link>
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
