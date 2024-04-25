import React, { useEffect, useState } from "react";
import RatingStars from "../common/RatingStars.jsx";
import GetAvgRating from "../../utils/avgRating.js";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div
          className="w-[250px]  border-2 rounded-lg border-[#e5de7e]"
        >
          <div className="rounded-lg ">
            <img
              src={course?.image}
              alt="course thumbnail"
              className={` w-full h-[250px] m-0 rounded-xl object-contain `}
            />
          </div>

          <div className="flex flex-col gap-1 px-1 py-1">
            <p className="text-xl text-richblack-5">{course?.courseTitle}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            <div className="flex items-center gap-2">
              {/* <span className="text-yellow-5">{avgReviewCount || 0}</span> */}
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {/* {course?.ratingAndReviews?.length} Ratings */}
              </span>
            </div>

            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCard;
