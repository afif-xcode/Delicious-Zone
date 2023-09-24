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
      <div className="w-full bg-gradient-to-b from-yellow-75 via-yellow-100 to-primaryColor">
        <Swiper
          navigation={true}
          pagination={{ dynamicBullets: true }}
          modules={[Navigation, Pagination]}
          className="flex items-center justify-center"
          style={{
            "--swiper-navigation-color": "#ffff",
            "--swiper-navigation-size": "60px",
            "--swiper-pagination-color": "#fff",
            "--swiper-pagination-size": "60px",
          }}
        >
          <SwiperSlide>
            <div className="flex justify-center items-center">
              <img src={slideImage1} alt="" className="w-[1300px] h-[800px]" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center items-center">
              <img
                src={slideImage2}
                alt=""
                className="w-[1300px] h-[750px] translate-x-16"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
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
