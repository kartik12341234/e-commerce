import React from "react";
import "./Bulk.css"; // Import the CSS file for styling

const Bulk = () => {
  return (
    <div className="bulk-container">
      <div className="bulk-content">
        <h1 className="bulk-heading">Looking to buy in bulk?</h1>
        <p className="bulk-subheading">
          Our wholesale team is available and will assist you during the
          process.
        </p>
      </div>
      <button className="bulk-button">Get in touch</button>
    </div>
  );
};

export default Bulk;
