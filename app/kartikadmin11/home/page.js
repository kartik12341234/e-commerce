"use client";
import React, { useState } from "react";

export default function Page() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    ingredients: "",
    Benefits: "",
    storageinfo: "",
    sizes: [{ size: "", price: "" }],
    image: null,
    additionalImages: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...product.sizes];
    updatedSizes[index][name] = value;
    setProduct((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const addSizeField = () => {
    setProduct((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", price: "" }],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setProduct((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ...files],
    }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setAdditionalImagesPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmitk = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: product.name,
        description: product.description,
        ingredients: product.ingredients,
        Benefits: product.Benefits,
        storageinfo: product.storageinfo,
        sizes: product.sizes,
      };

      if (product.image) {
        const imageData = await readFileAsDataURL(product.image);
        formData.image = imageData;
      }

      const additionalImages = await Promise.all(
        product.additionalImages.map(readFileAsDataURL)
      );
      formData.additionalImages = additionalImages;

      const response = await fetch("/api/admin/hproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product added successfully");
      } else {
        console.error("Error adding product:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add Home Product
        </h2>
        <form onSubmit={handleSubmitk} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 w-full object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Images (max 10)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesUpload}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            />
            {additionalImagesPreview.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {additionalImagesPreview.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Additional Preview ${index}`}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
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
              rows="4"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              value={product.ingredients}
              onChange={handleChange}
              rows="2"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Benefits
            </label>
            <textarea
              name="Benefits"
              value={product.Benefits}
              onChange={handleChange}
              rows="2"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Storage Information
            </label>
            <textarea
              name="storageinfo"
              value={product.storageinfo}
              onChange={handleChange}
              rows="2"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sizes and Prices
            </label>
            {product.sizes.map((size, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  name="size"
                  placeholder="Size (e.g., 250 ml)"
                  value={size.size}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={size.price}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSizeField}
              className="mt-2 text-blue-500"
            >
              + Add Another Size
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
