import React from "react";

const SmallBox = () => {
  return (
    <div style={styles.container}>
      <button style={styles.button}>ADD TO CART</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: "23px",
    // marginTop: "-75px",
    bottom: 0,
    backgroundColor: "#000",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    padding: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00584b",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default SmallBox;
