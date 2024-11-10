"use client";
import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Login() {
  const route = useRouter();
  const [signup, setsignup] = useState({
    email: "",

    password: "",
  });

  const handlesubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/login", signup);
      console.log(response.data);
      toast.success("Login successfully");

      localStorage.setItem("login", "true");
      route.push("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found");
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
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Email"
            value={signup.email}
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

          <button type="submit" className="cre">
            Login now
          </button>
        </div>
      </form>
      {/* {error && <p className="error-message">{error}</p>}  */}
      {/* </Toaster> */}
    </div>
  );
}

export default Login;
