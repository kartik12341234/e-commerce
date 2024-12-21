// pages/categories.js

import React from "react";

export default function Categories() {
  // Array of oil categories with name and image URL
  const oils = [
    {
      name: "kartijey",
      image:
        "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
    },
    {
      name: "Coconut Oil",
      image:
        "https://www.rosierfoods.com/cdn/shop/collections/image_867e0c03-ac86-45ae-9acc-494cbb52a8d5.jpg?v=1712577492",
    },
    {
      name: "Olive Oil",
      image:
        "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
    },
    {
      name: "Almond Oil",
      image:
        "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
    },
    {
      name: "Sesame Oil",
      image:
        "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
    },
    {
      name: "Avocado Oil",
      image:
        "https://www.anveshan.farm/cdn/shop/files/anv-saffron-01.jpg?v=1715771792&width=360",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-semibold text-center mb-10">
        choose buy Categories
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
        {oils.map((oil, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={oil.image}
              alt={oil.name}
              className="w-full h-48 obconsole.log('Categories component rendered');
console.log('Oils array:', oils);ject-cover"
            />
            <div className="p-4">
              {/* <h2 className="text-xl font-medium text-gray-800">{oil.name}</h2> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
