import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, Autoplay]);
const SliderComponent = ({listslider}) => {
     return (
          <React.Fragment>
          <Swiper tag="section"
              id="swiper"
              navigation

              spaceBetween={33}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
              }}
              onTransitionEnd={(swiper) => console.log('Swiper Initialized!', swiper)}
              onSlideChange={(swiper) => console.log('Slide index changed to:', swiper.activeIndex)}
              style={{ width: '1320px', height: '400px' }}
          >
              <SwiperSlide key={1}> <img src="https://th.bing.com/th/id/OIP.CUsYkhGzSRZrgJYzT8GBZAHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" style={{ width: '1320px', height: '400px' }} /></SwiperSlide>
              <SwiperSlide key={2}> <img src="https://th.bing.com/th/id/OIP.CUsYkhGzSRZrgJYzT8GBZAHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" style={{ width: '1320px', height: '400px' }} /></SwiperSlide>
              <SwiperSlide key={3}> <img src="https://th.bing.com/th/id/OIP.CUsYkhGzSRZrgJYzT8GBZAHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" style={{ width: '1320px', height: '400px' }} /></SwiperSlide>
              <SwiperSlide key={4}> <img src="https://th.bing.com/th/id/OIP.CUsYkhGzSRZrgJYzT8GBZAHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" style={{ width: '1320px', height: '400px' }} /></SwiperSlide>
              <SwiperSlide key={5}> <img src="https://th.bing.com/th/id/OIP.CUsYkhGzSRZrgJYzT8GBZAHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" style={{ width: '1320px', height: '400px' }} /></SwiperSlide>
              <SwiperSlide key={6}> <img src="https://th.bing.com/th/id/OIP.CUsYkhGzSRZrgJYzT8GBZAHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" style={{ width: '1320px', height: '400px' }} /></SwiperSlide>
              <SwiperSlide key={7}> <img src="https://th.bing.com/th/id/OIP.CUsYkhGzSRZrgJYzT8GBZAHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="" style={{ width: '1320px', height: '400px' }} /></SwiperSlide>
          </Swiper>
      </React.Fragment>
     );
};

export default SliderComponent;
