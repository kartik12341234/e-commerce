"use client";
import React from "react";

// Card data array
const cardData = [
  {
    id: 1,
    imageSrc:
      "https://www.rosierfoods.com/cdn/shop/files/Untitled-1_0924a88d-cfa0-4981-833c-c8bc8b4abb05.png?v=1729358280&width=400",
    label: "Product 1",
    link: "/product-1",
  },
  {
    id: 2,
    imageSrc:
      "https://www.rosierfoods.com/cdn/shop/files/Untitled-1_0924a88d-cfa0-4981-833c-c8bc8b4abb05.png?v=1729358280&width=400",
    label: "Product 2",
    link: "/product-2",
  },
  {
    id: 3,
    imageSrc:
      "https://www.rosierfoods.com/cdn/shop/files/Untitled-1_0924a88d-cfa0-4981-833c-c8bc8b4abb05.png?v=1729358280&width=400",
    label: "Product 3",
    link: "/product-3",
  },
  {
    id: 4,
    imageSrc:
      "https://www.rosierfoods.com/cdn/shop/files/Untitled-1_0924a88d-cfa0-4981-833c-c8bc8b4abb05.png?v=1729358280&width=400",
    label: "Product 4",
    link: "/product-4",
  },
  {
    id: 5,
    imageSrc:
      "https://www.rosierfoods.com/cdn/shop/files/Untitled-1_0924a88d-cfa0-4981-833c-c8bc8b4abb05.png?v=1729358280&width=400",
    label: "Product 5",
    link: "/product-5",
  },
  {
    id: 6,
    imageSrc:
      "https://www.rosierfoods.com/cdn/shop/files/Untitled-1_0924a88d-cfa0-4981-833c-c8bc8b4abb05.png?v=1729358280&width=400",
    label: "Product 6",
    link: "/product-6",
  },
];

export default function page() {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="w-64 border border-gray-300 rounded-lg shadow-lg overflow-hidden text-center bg-white"
        >
          {/* Image */}
          <img
            src={card.imageSrc}
            alt={card.label}
            className="w-full h-40 object-cover"
          />
          {/* Label */}
          <h3 className="text-lg font-semibold my-4">{card.label}</h3>
          {/* Button */}
          <a
            href={card.link}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
}
