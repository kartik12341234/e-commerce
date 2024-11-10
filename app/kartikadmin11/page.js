"use client";
import React, { useState } from "react";

export default function Page() {
  const [product, setProduct] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    size: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: product.name,
        description: product.description,
        price: product.price,
        size: product.size,
      };

      // Convert the image file to a base64 string
      if (product.image) {
        const reader = new FileReader();
        reader.readAsDataURL(product.image);
        reader.onloadend = async () => {
          formData.image = reader.result;

          // Send data to the API
          const response = await fetch("/api/admin/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const data = await response.json();
          if (data.success) {
            console.log("Product added:", data.product);
            alert("Product added successfully");
          } else {
            console.error("Error adding product:", data.message);
          }
        };
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 w-full object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <textarea
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description (min 100 characters)"
              minLength={100}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <input
              type="text"
              name="size"
              value={product.size}
              onChange={handleChange}
              placeholder="Enter product size (e.g., Small, Medium, Large)"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
}
