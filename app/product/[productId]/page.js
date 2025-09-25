"use client";
import React, { useEffect, useRef, useState } from "react";
import Wr from "@/components/Wr";
import { useRouter } from "next/navigation";
import axios from "axios";
import Homeproduct from "@/components/Homeproduct";
import Image from "next/image";
import { User, UserCheck, Minus, Plus } from "lucide-react";
import OilsTable from "@/components/OilsTable";
import CustomerReviews from "@/components/Review";
import Pl from "@/components/Pl";

export default function Page({ params }) {
  // Properly handle params Promise for Next.js 14+
  const [unwrappedParams, setUnwrappedParams] = useState(null);
  
  useEffect(() => {
    async function unwrapParams() {
      try {
        const resolvedParams = await Promise.resolve(params);
        setUnwrappedParams(resolvedParams);
      } catch (e) {
        console.error('Error unwrapping params:', e);
      }
    }
    unwrapParams();
  }, [params]);

  const productIdParam = unwrappedParams?.productId;
  
  const route = useRouter();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    productId: productIdParam,
    username: "",
    verified: false,
    rating: 5,
    comment: "",
  });
  const [productId, setProductId] = useState(productIdParam);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [showCartBar, setShowCartBar] = useState(false);
  const number = Math.floor(Math.random() * 85) + 1;
  const reviewSectionRef = useRef(null);

  // useEffect for scroll bar
  useEffect(() => {
    const handleScroll = () => {
      setShowCartBar(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user email once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("loginid");
      setUseremail(email);
    }
  }, []);

  // Set productId from params
  useEffect(() => {
    if (productIdParam) {
      setProductId(productIdParam);
      setNewReview(prev => ({ ...prev, productId: productIdParam }));
    }
  }, [productIdParam]);

  // Fetch product details and reviews
  useEffect(() => {
    if (!productId) return;
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/api/admin/pro/${productId}`);
        setProduct(response.data.product);
        setLoading(false);
        fetchReviews(response.data.product._id);
      } catch (err) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [productId]);

  // Fetch reviews
  const fetchReviews = async (id = productId) => {
    if (!id) return;
    try {
      const response = await axios.get(`/api/reviews/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Handlers
  const handleScrollToReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  
  const handleOptionChange = (size) => setSelectedOption(size);
  
  const buy = () => {
    if (!selectedOption) {
      alert("Please select a product size before proceeding.");
      return;
    }
    route.push(`/checkout/${productId}?selectedSize=${selectedOption._id}&quantity=${quantity}`);
  };
  
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  
  const addtocart = () => {
    alert("added to cart");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/reviews/${productId}`, newReview);
      setNewReview({
        productId: productId,
        username: "",
        verified: false,
        rating: 5,
        comment: "",
      });
      alert("Review submitted successfully!");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  
  const toggleCollapse = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  
  const renderCollapsibleSection = (sectionName, data) => {
    if (!data || data.length === 0) return null;
    return (
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <button
          onClick={() => toggleCollapse(sectionName)}
          className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          <h2 className="text-lg font-bold uppercase tracking-wide">{sectionName}</h2>
          <div className="text-gray-600">
            {collapsedSections[sectionName] ? <Minus size={20} /> : <Plus size={20} />}
          </div>
        </button>
        {collapsedSections[sectionName] && (
          <div className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={`Image for ${sectionName}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                      {item.paragraph}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-medium text-gray-600">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-medium text-red-600">{error}</div>
    </div>
  );

  // Log and adjust sections dynamically based on the product object
  const sections = Object.keys(product).reduce((acc, key) => {
    if (product[key] && Array.isArray(product[key])) {
      acc[key] = product[key];
    }
    return acc;
  }, {});

  return (
    <>
      <Pl />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Additional Images - Vertical */}
            {product?.additionalImages && product?.additionalImages.length > 0 && (
              <div className="flex flex-col gap-2">
                {product.additionalImages.map((imageUrl, index) => (
                  <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 cursor-pointer">
                    <img
                      src={imageUrl}
                      alt={`Additional image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Main Product Image */}
            <div className="flex-1 aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product?.imageUrl}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                  <span className="text-gray-600">| {number} reviews</span>
                </div>
                {selectedOption ? (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₹{selectedOption.price * quantity}</div>
                    <div className="text-sm text-gray-600">MRP (Incl. of all taxes)</div>
                  </div>
                ) : (
                  <div className="text-lg text-gray-500">Select a size to see the price</div>
                )}
              </div>
              <button
                onClick={handleScrollToReviews}
                className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
              >
                see all reviews
              </button>
            </div>

            {/* Feature Icons - Horizontal Row */}
            <div className="flex justify-center gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16  rounded-full flex items-center justify-center">
                  <img
                    src="https://www.anveshan.farm/cdn/shop/files/newly_active.svg?v=1713435265&width=60"
                    width={50}
                    height={50}
                    alt="Feature icon"
                    className="w-20 h-20 "
                  />
                </div>
              ))}
            </div>

            {/* Size Selection - 4 Cards in One Row */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Choose Size</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {product?.sizes.map((size) => (
                  <button
                    key={size._id}
                    onClick={() => handleOptionChange(size)}
                    className={`border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedOption?._id === size._id
                        ? 'bg-[#2a431c] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`py-2 px-3 text-sm font-medium border-b-2 ${
                      selectedOption?._id === size._id
                        ? 'bg-[#2a431c] text-white bg-[#2a431c]'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {size.size} jar
                    </div>
                    <div className="p-3 bg-white">
                      <div className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-1">
                        ₹{size.price}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        ₹{(size.price / 1000).toFixed(2)}/ml
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={addtocart}
                  className="flex-1 bg-[#2a431c] hover:bg-[#2a431c] text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200"
                >
                  ADD TO CART
                </button>
                
                <div className="flex items-center border-2 bg-[#2a431c] rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={handleDecrease}
                    className="bg-[#2a431c] hover:bg-[#2a431c] text-white px-4 py-4 font-bold text-xl transition-colors duration-200 flex items-center justify-center"
                  >
                    <Minus size={18} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 text-center text-lg font-medium bg-white outline-none border-0"
                  />
                  <button
                    onClick={handleIncrease}
                    className="bg-[#2a431c] hover:bg-[#2a431c] text-white px-4 py-4 font-bold text-xl transition-colors duration-200 flex items-center justify-center"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={buy}
                className="w-full bg-[#2a431c] hover:bg-[#2a431c] text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors duration-200"
              >
                BUY NOW
              </button>

              <button
                onClick={buy}
                className="w-full bg-[#2a431c] hover:bg-[#2a431c] text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors duration-200"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Fixed Cart Bar */}
        {showCartBar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <button
                onClick={addtocart}
                className="flex-1 bg-[#2a431c] hover:bg-[#2a431c] text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
              >
                ADD TO CART
              </button>
              
              <div className="flex items-center border-2 bg-[#2a431c] rounded-lg overflow-hidden bg-white">
                <button
                  onClick={handleDecrease}
                  className="bg-[#2a431c] hover:bg-[#2a431c] text-white px-3 py-3 font-bold transition-colors duration-200 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center font-medium bg-white outline-none border-0"
                />
                <button
                  onClick={handleIncrease}
                  className="bg-[#2a431c] hover:bg-[#2a431c] text-white px-3 py-3 font-bold transition-colors duration-200 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button
                onClick={buy}
                className="flex-1 bg-[#2a431c] hover:bg-[#2a431c] text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
              >
                BUY NOW
              </button>
            </div>
          </div>
        )}

        {/* Collapsible Sections */}
        <div className="mt-12 space-y-4">
          {Object.keys(sections)
            .slice(0, -2)
            .map((sectionName) => {
              const sectionData = sections[sectionName];
              if (!sectionData || sectionData.length === 0) {
                return null;
              }
              return renderCollapsibleSection(sectionName, sectionData);
            })}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 py-12" ref={reviewSectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <Wr />

        {/* Write a Review Form - Centered */}
<div className="flex justify-center items-center mb-8">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-lg shadow-sm max-w-2xl w-full"
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <input
        type="text"
        placeholder="Your name"
        value={newReview.username}
        onChange={(e) =>
          setNewReview({ ...newReview, username: e.target.value })
        }
        required
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
      />
      <select
        value={newReview.rating}
        onChange={(e) =>
          setNewReview({ ...newReview, rating: parseInt(e.target.value) })
        }
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>
    <textarea
      placeholder="Write your review"
      value={newReview.comment}
      onChange={(e) =>
        setNewReview({ ...newReview, comment: e.target.value })
      }
      required
      rows={4}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none mb-4"
    />
    <button
      type="submit"
      className="bg-[#2a431c] hover:bg-[#2a431c] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
    >
      Submit Review
    </button>
  </form>
</div>


          {/* Reviews List - Full Width from Next Row */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">All Reviews</h3>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                <option>Most Recent</option>
                <option>Highest Rating</option>
                <option>Lowest Rating</option>
              </select>
            </div>
            
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserCheck size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{review.username}</h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Verified</span>
                        )}
                      </div>
                      <div className="text-yellow-400 text-sm">
                        {Array(review.rating).fill("⭐").join("")}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    👍 {review.helpfulVotes || 0}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                    👎 {review.notHelpfulVotes || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OilsTable />
      <div className="mt-16">
        <Homeproduct />
      </div>
    </>
  );
}