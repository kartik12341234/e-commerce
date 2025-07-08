"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecipeDetail = ({ params }) => {
  const router = useRouter();
  const recipe = {
    id: params.id,
    name: "Organic Quinoa Bowl",
    description:
      "A nutrient-rich bowl with fresh vegetables and homemade dressing",
    image:
      "https://twobrothersindiashop.com/cdn/shop/files/Sugarcane_Jaggery_Crushed_Granular_-_lab_listed_500x.jpg?v=1732004109",
    category: "Lunch",
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: 4,
    ingredients: [
      "2 cups organic quinoa",
      "4 cups vegetable broth",
      "1 cup cherry tomatoes",
      "1 cucumber, diced",
      "1 avocado, sliced",
      "2 cups mixed greens",
    ],
    instructions: [
      "Rinse quinoa thoroughly under cold water",
      "Bring vegetable broth to a boil in a medium pot",
      "Add quinoa, reduce heat, and simmer for 20 minutes",
      "While quinoa cooks, prepare vegetables",
      "Combine all ingredients in a bowl",
      "Season with salt and pepper to taste",
    ],
    nutritionInfo: {
      calories: "380",
      protein: "12g",
      carbs: "52g",
      fat: "14g",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center text-green-600 hover:text-green-700"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Recipes
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative h-96 rounded-xl overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            <div className="flex space-x-4 text-sm">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                {recipe.category}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {recipe.cookTime}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                {recipe.difficulty}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="font-bold mr-4">{index + 1}.</span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(recipe.nutritionInfo).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 p-4 rounded-lg text-center"
                >
                  <div className="text-gray-500 text-sm">{key}</div>
                  <div className="font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
