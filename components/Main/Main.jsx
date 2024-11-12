"use client";
import React, { useEffect } from "react";
// import Header from "../Reg/Header";
import EmblaCarousel from "./EmblaCarousel";
import "../css/base.css";
import "../css/sandbox.css";
import "../css/embla.css";
import "./Mian.css";
import { gsap } from "gsap";
// import Spline from "@splinetool/react-spline";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Main = () => {
  return (
    <div className="main" style={{ zIndex: "-9999" }}>
      {/* <Header /> */}
      <div className="con">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="contdown">
        <div className="cleft"></div>
        <div className="cright"></div>
      </div>
    </div>
  );
};

export default Main;
