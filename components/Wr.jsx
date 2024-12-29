import React, { useEffect } from "react";

export default function Wr() {
  useEffect(() => {
    const reviewsCount = document.querySelector(".reviews-count");

    // Scroll down by 40% when clicking on reviews count
    if (reviewsCount) {
      reviewsCount.addEventListener("click", () => {
        const scrollAmount = document.documentElement.scrollHeight * 0.6;
        window.scrollBy({ top: scrollAmount, behavior: "smooth" });
      });
    }

    return () => {
      if (reviewsCount) {
        reviewsCount.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div
      className="reviews-containerd"
      style={{
        margin: "30px auto",
        display: "flex",
        gap: "100px",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div
        className="rating-overview"
        style={{ borderRight: "1px solid #ccc", paddingRight: "20px" }}
      >
        <div
          className="average-rating"
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <span className="stars">★★★★★</span>
          <span className="average-text">4.64 out of 5</span>
        </div>
        <p className="reviews-count">Based on 67 reviews</p>
      </div>

      <div
        className="ratings-breakdown"
        style={{ borderRight: "1px solid #ccc", paddingRight: "20px" }}
      >
        <div className="rating-bar">
          <span className="stars">★★★★★</span>
          <div className="bar">
            <div className="filled" style={{ width: "70%" }}></div>
          </div>
          <span className="count">47</span>
        </div>
        <div className="rating-bar">
          <span className="stars">★★★★☆</span>
          <div className="bar">
            <div className="filled" style={{ width: "20%" }}></div>
          </div>
          <span className="count">16</span>
        </div>
        <div className="rating-bar">
          <span className="stars">★★★☆☆</span>
          <div className="bar">
            <div className="filled" style={{ width: "6%" }}></div>
          </div>
          <span className="count">4</span>
        </div>
        <div className="rating-bar">
          <span className="stars">★★☆☆☆</span>
          <div className="bar">
            <div className="filled" style={{ width: "0%" }}></div>
          </div>
          <span className="count">0</span>
        </div>
        <div className="rating-bar">
          <span className="stars">★☆☆☆☆</span>
          <div className="bar">
            <div className="filled" style={{ width: "0%" }}></div>
          </div>
          <span className="count">0</span>
        </div>
      </div>

      <button className="write-review">Write a review</button>
    </div>
  );
}
