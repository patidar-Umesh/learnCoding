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
    <div className="mt-4">
      {Courses?.length ? (
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="max-h-[30rem] "
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}

      {nextPrevBtn && (
        <div className="flex justify-center mt-2 items-center gap-10">
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
