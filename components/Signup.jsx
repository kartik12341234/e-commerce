"use client";
import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handlesubmit = async (event) => {
    event.preventDefault();

    if (!signup.name || !signup.email || !signup.password || !signup.number) {
      toast.error("Please fill all the fields");
    }

    try {
      const response = await axios.post("/api/users/signup", signup);
      console.log(response.data);
      toast.success("User created successfully");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Email already exists");
        }
        if (error.response === 201) {
          toast.error("Something went wrong");
        }
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setsignup((prevSignup) => ({ ...prevSignup, [name]: value }));
  };

  return (
    <div className="main-container">
      <Toaster position="top-center" />
      <div className="title">
        <h1
          className="head"
          style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}
        >
          Create account
        </h1>
      </div>
      <form onSubmit={handlesubmit}>
        <div className="forminput">
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            placeholder="Name"
            value={signup.name}
            className="in"
          />
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Email"
            value={signup.email}
            className="in"
          />
          <input
            type="number"
            name="number"
            onChange={handleInputChange}
            placeholder="Number"
            value={signup.number}
            className="in"
          />
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            placeholder="Password"
            value={signup.password}
            className="in"
          />
          <p
            style={{
              textAlign: "center",
              fontSize: "15px",

              // fontWeight: "bold",
              color: "grey",
            }}
          >
            Already have an account?{" "}
            <span style={{ color: "blue", textDecorationLine: "underline" }}>
              Login here
            </span>{" "}
          </p>
          <button type="submit" className="cre">
            create account
          </button>
        </div>
      </form>
      {/* {error && <p className="error-message">{error}</p>}  */}
      {/* </Toaster> */}
    </div>
  );
}

export default Signup;
