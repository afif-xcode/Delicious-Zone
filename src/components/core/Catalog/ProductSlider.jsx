import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// Import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules"

import ProductCard from "./ProductCard"

function ProductSlider({ Products }) {
  return (
    <>
      {Products?.length ? (
        <Swiper
        slidesPerView={3}
        spaceBetween={50}
        pagination={{
        clickable: true,
        }}
        autoplay={{
        delay: 1500,
        disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        >
          {Products?.map((product, i) => (
            <SwiperSlide key={i}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Product Found</p>
      )}
    </>
  )
}

export default ProductSlider
