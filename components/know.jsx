import React from "react";
import "./ex.css";
import Link from "next/link";
export default function Know() {
  return (
    <div>
      <div className="product-sectionv">
        <div className="product-headerv">
          <h2 className="h2s">Explore Our Full Range</h2>
          <p>
            Explore our wide range of staples and fresh harvests. Experience the
            goodness of 100% natural farm essentials, delivered to your doorstep
            every day with Anveshan.
          </p>
        </div>
        <div className="product-image-containerv">
          <img
            src="https://www.anveshan.farm/cdn/shop/files/diwali-banner-box.jpg?v=1728889762&width=2100"
            alt="Product Range"
            className="product-imagev"
          />
          <Link href={"/allproduct"}>
            {" "}
            <button className="view-products-buttonv">Shop all</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
