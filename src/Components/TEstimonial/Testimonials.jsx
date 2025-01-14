import React, { useEffect, useState } from "react";
import Sheared from "../../ShearedSEction/Sheared";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactStars from "react-rating-stars-component";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Navigation, Pagination } from "swiper/modules";
import Axiospublic from "../../AxiosPublic/Axiospublic";

const Testimonials = () => {
  const [review, setReview] = useState([]);
  const useAxiospublic = Axiospublic()

  useEffect(() => {
    useAxiospublic.get('/review')
      .then((res) => setReview(res.data));
  }, []);

  return (
    <div className="my-36">
      {/* Section Header */}
      <Sheared Subtitle={"What Our Client Say"} title={"TESTIMONIALS"} />

      {/* Swiper for Reviews */}
      <Swiper
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper mt-12"
      >
        {/* Map through reviews */}
        {review.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center px-8 max-w-xl mx-auto flex flex-col items-center">
              <ReactStars
                count={5}
                edit={false}
                size={70}
                value={item.rating}
                activeColor="#ffd700"
              />
              <p className="text-gray-600 italic text-lg mb-4">
                {item.details}
              </p>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-yellow-500">{item.position}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
