import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productData, responsive } from "../data/product-data";
import Product from "../components/Product/Product";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import slideImage1 from "../assets/Images/featured.png";
import slideImage2 from "../assets/Images/featured2.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

import React from 'react';
import Featured from '../components/core/Home/Featured';


const Home = () => {
  const product = productData.map((product) => (
    <Product
      key={product.id}
      imageurl={product.imageurl}
      name={product.name}
      price={product.price}
      description={product.description}
    />
  ));

  return (
    <div>
      <Featured></Featured>
      
      <div className="p-10 ">
        <h3 className="text-primaryColor text-2xl font-black flex justify-center text-center m-8 p-4">
          Popular Items
        </h3>
        <Carousel
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
        >
          {product}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
