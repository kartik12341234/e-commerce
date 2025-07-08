"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecipeCard = ({ recipe }) => {
  const router = useRouter();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => router.push(`/reciepe/${recipe.id}`)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white text-sm font-medium px-2 py-1 rounded-full bg-green-600">
            {recipe.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {recipe.cookTime}
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const RecipesPage = () => {
  const recipes = [
    {
      id: 1,
      name: "Organic Quinoa Bowl",
      description:
        "A nutrient-rich bowl with fresh vegetables and homemade dressing",
      image:
        "https://twobrothersindiashop.com/cdn/shop/files/Sugarcane_Jaggery_Crushed_Granular_-_lab_listed_500x.jpg?v=1732004109",
      category: "Lunch",
      cookTime: "25 mins",
      difficulty: "Easy",
    },
    {
      id: 4,
      name: "Organic Quinoa Bowl",
      description:
        "A nutrient-rich bowl with fresh vegetables and homemade dressing",
      image:
        "https://twobrothersindiashop.com/cdn/shop/files/Sugarcane_Jaggery_Crushed_Granular_-_lab_listed_500x.jpg?v=1732004109",
      category: "Lunch",
      cookTime: "25 mins",
      difficulty: "Easy",
    },
    {
      id: 5,
      name: "Organic Quinoa Bowl",
      description:
        "A nutrient-rich bowl with fresh vegetables and homemade dressing",
      image:
        "https://twobrothersindiashop.com/cdn/shop/files/Sugarcane_Jaggery_Crushed_Granular_-_lab_listed_500x.jpg?v=1732004109",
      category: "Lunch",
      cookTime: "25 mins",
      difficulty: "Easy",
    },
    {
      id: 6,
      name: "Organic Quinoa Bowl",
      description:
        "A nutrient-rich bowl with fresh vegetables and homemade dressing",
      image:
        "https://twobrothersindiashop.com/cdn/shop/files/Sugarcane_Jaggery_Crushed_Granular_-_lab_listed_500x.jpg?v=1732004109",
      category: "Lunch",
      cookTime: "25 mins",
      difficulty: "Easy",
    },
    {
      id: 2,
      name: "Green Smoothie Bowl",
      description: "Start your day with this energizing smoothie bowl",
      image: "/recipes/smoothie-bowl.jpg",
      category: "Breakfast",
      cookTime: "10 mins",
      difficulty: "Easy",
    },
    {
      id: 3,
      name: "Millet Risotto",
      description: "Creamy millet risotto with seasonal vegetables",
      image: "/recipes/millet-risotto.jpg",
      category: "Dinner",
      cookTime: "45 mins",
      difficulty: "Medium",
    },
    // Add more recipes as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Recipes</h1>
        <p className="text-gray-600">
          Discover healthy and delicious recipes made with organic ingredients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;

// app/recipes/[id]/page.jsx
