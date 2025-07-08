import React, { useEffect } from "react";
import "./wcu.css";
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
        gap: "20px",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div
        className="rating-overview"
        style={{
          borderRight: "1px solid #ccc",
          paddingBottom: "20px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          className="average-rating"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <span className="stars">★★★★★</span>
          <span className="average-text">4.64 out of 5</span>
        </div>
        <p className="reviews-count" style={{ marginTop: "10px" }}>
          Based on 67 reviews
        </p>
      </div>

      <div
        className="ratings-breakdown"
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        {["★★★★★", "★★★★☆", "★★★☆☆", "★★☆☆☆", "★☆☆☆☆"].map((stars, index) => {
          const width = [70, 20, 6, 0, 0][index];
          const count = [47, 16, 4, 0, 0][index];
          return (
            <div
              key={index}
              className="rating-bar"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span className="stars">{stars}</span>
              <div className="bar" style={{ flex: 1, margin: "0 10px" }}>
                <div
                  className="filled"
                  style={{
                    width: `${width}%`,
                    background: "#2a431c",
                    height: "8px",
                  }}
                ></div>
              </div>
              <span className="count">{count}</span>
            </div>
          );
        })}
      </div>

      <button
        className="write-review"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2a431c",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Write a review
      </button>
    </div>
  );
}
