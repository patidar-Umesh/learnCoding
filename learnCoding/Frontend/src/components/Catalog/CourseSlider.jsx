import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import CourseCard from "./CourseCard";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const CourseSlider = ({ Courses, nextPrevBtn = false }) => {
  return (
    <div className="mt-14 ">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={100}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              // spaceBetween: 100,
            },
            768: {
              slidesPerView: 3,
              // spaceBetween: 100,
            },
            1024: {
              slidesPerView: 3,
              // spaceBetween: 100,
            },
          }}
        >
          {Courses?.map((course, index) => (
            <SwiperSlide
              key={index}
            >
              <div className="h-full  flex items-center justify-center">
                <CourseCard course={course} Height={"h-[250px]"} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}

      {nextPrevBtn && (
        <div className="flex justify-center  mt-2 items-center gap-10">
          <button className="text-white  swiper-button-prev">
            <GrFormPrevious className="text-[3rem]" />
          </button>
          <button className="text-white  swiper-button-next">
            <MdOutlineNavigateNext className="text-[3.3rem]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;
