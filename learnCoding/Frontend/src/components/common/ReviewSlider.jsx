import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode, Pagination}  from 'swiper/modules'
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../apiServices/apiConnector'
import { courseEndpoints } from '../../apiServices/apis'
import { FaStar } from 'react-icons/fa'


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", courseEndpoints.REVIEWS_DETAILS_API)
            // console.log("Logging response in rating", data);

            if(data?.success) {
                setReviews(data?.data);
            }

            // console.log("Rating and reviews", reviews);

        }
        fetchAllReviews();
    }, []);


  return (
    <div className='text-white mt-4 mx-5'>
        <div className='h-[220px]  max-w-maxContent'>
             <Swiper
            slidesPerView={3}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay: 2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-full'
            >

                {
                    reviews?.map((review, index) => (
                        <SwiperSlide key={index} >
                           <div className='flex flex-col p-4 justify-center bg-[#696262] h-[150px] w-[300px]  items-center'>
                           <img
                            src={review?.user?.image
                             ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                              alt='Profile Pic'
                              className='h-9 w-9 object-cover rounded-full'
                            />
                            <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p>{review?.course?.courseName}</p>
                            <p>
                                {review?.review}
                            </p>
                            <p>{review?.rating.toFixed(1)}</p>
                            
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            />
                           </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper> 
        </div>
    </div>
  )
}

export default ReviewSlider
