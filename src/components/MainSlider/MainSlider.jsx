/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Style from "./MainSlider.module.css";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import slide4 from "../../assets/images/grocery-banner.png";
import slide5 from "../../assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>

      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={slide1} className="w-full h-[400px] object-cover" alt="" />
            <img src={slide3} className="w-full h-[400px] object-cover" alt="" />
            <img src={slide5} className="w-full h-[400px] object-cover" alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slide2} className="w-full h-[200px]" alt="" />
          <img src={slide3} className="w-full h-[200px]" alt="" />
        </div>
      </div>


      
    </>
  );
}
