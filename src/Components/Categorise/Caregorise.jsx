import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import slider1 from "../../assets/home/slide1.jpg";
import slider2 from "../../assets/home/slide2.jpg";
import slider3 from "../../assets/home/slide3.jpg";
import slider4 from "../../assets/home/slide4.jpg";
import slider5 from "../../assets/home/slide5.jpg";
import Sheared from "../../ShearedSEction/Sheared";

const Caregorise = () => {
  return (
    <div className="my-20">
        <Sheared Subtitle={"From 11:00 pm To 10:00 am"} title={"ORDER ONLINE"}>

        </Sheared>
      <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img className="w-full" src={slider1} alt="" />
            <h3 className="-mt-20 text-center font-bold text-white md:text-2xl text-xl">SALAD</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img className="w-full" src={slider2} alt="" />
            <h3 className="-mt-20 text-center font-bold text-white md:text-2xl text-xl">Pizzas</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img className="w-full" src={slider3} alt="" />
            <h3 className="-mt-20 text-center font-bold text-white md:text-2xl text-xl">Soups</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img className="w-full" src={slider4} alt="" />
            <h3 className="-mt-20 text-center font-bold text-white md:text-2xl text-xl">Desserts</h3>
        </SwiperSlide>
        
      </Swiper>
    </>
    </div>
  );
};

export default Caregorise;
