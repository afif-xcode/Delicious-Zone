import React from 'react'
import { productData, responsive } from "../../../data/product-data";
import Product from "../../Product/Product";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
  return (
    <div>
        <div className='w-full'>
          <Swiper
              slidesPerView={5}
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
              {
              productData.map((product) => (
                  <SwiperSlide>
                  <Product
                  key={product.id}
                  imageurl={product.imageurl}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  />
                  </SwiperSlide>
              ))
              }
          </Swiper>
        </div>
    </div>
  )
}

export default Slider