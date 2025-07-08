"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Coupon() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const products = [
    { name: "Sunflower Oil", link: "/products/sunflower-oil" },
    { name: "Coconut Oil", link: "/products/coconut-oil" },
    { name: "Olive Oil", link: "/products/olive-oil" },
    { name: "Almond Oil", link: "/products/almond-oil" },
  ];

  const handleProductClick = (link) => {
    setMenuOpen(false);
    router.push(link);
  };

  return (
    <div className="coupon overflow-hidden">
      <Link href="/allproduct">
        <div className="bg-black relative">
          {/* Moving Coupon Animation */}
          <div className="animate-slide-in w-full">
            <div className="flex animate-scroll whitespace-nowrap py-2">
              <div className="flex space-x-4 animate-scroll-primary">
                <span className="text-sm font-medium text-white mx-4">
                  Get free delivery on orders over ₹400/-
                </span>
                <span className="text-sm font-medium text-white mx-4">
                  Get first order at 20% off
                </span>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex space-x-4 animate-scroll-secondary">
                <span className="text-sm font-medium text-white mx-4">
                  Get free delivery on orders over ₹400/-
                </span>
                <span className="text-sm font-medium text-white mx-4">
                  Get first order at 20% off
                </span>
                <span className="text-sm font-medium text-white mx-4">
                  Get first order at 20% off
                </span>
                <span className="text-sm font-medium text-white mx-4">
                  Get first order at 20% off
                </span>
                <span className="text-sm font-medium text-white mx-4">
                  Get first order at 20% off
                </span>
                <span className="text-sm font-medium text-white mx-4">
                  Get first order at 20% off
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .animate-slide-in {
          animation: slide-in 3s forwards;
        }

        @keyframes slide-in {
          from {
            transform: translateX(70%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll-primary {
          animation-delay: 0s;
        }

        .animate-scroll-secondary {
          animation-delay: 0s;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
