import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import slideImage1 from "../../../assets/Images/featured.png"
import slideImage2 from "../../../assets/Images/featured2.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';

const Featured = () => {
  return (
    <div>
        <div className='w-full bg-gradient-to-b from-yellow-75 via-yellow-100 to-primaryColor'>
        <Swiper navigation={true} pagination={{dynamicBullets: true,}} modules={[Navigation, Pagination]} className="flex items-center justify-center" 
              style={{"--swiper-navigation-color": "#ffff", "--swiper-navigation-size": "60px", "--swiper-pagination-color": "#fff", "--swiper-pagination-size": "60px",}}>
          <SwiperSlide>
            <div className='flex justify-center items-center'>
              <img src={slideImage1} alt="" className='w-[1300px] h-[800px]' />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='flex justify-center items-center'>
              <img src={slideImage2} alt="" className='w-[1300px] h-[750px] translate-x-16'/>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Featured