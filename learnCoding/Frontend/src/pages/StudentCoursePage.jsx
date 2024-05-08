import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../apiServices/apiHandler/courseDetailsAPI.js";
import {
  setEntireCourseData,
  setTotalNoOfLectures,
  setCourseSectionData,
  setCompletedLectures,
} from "../store/slices/studentCourseSlice.js";
import VideoDetailsSidebar from "../components/StudentCourse/VideoDetailsSidebar.jsx";
import CourseReviewModal from "../components/StudentCourse/CourseReviewModal.jsx";
import Button from "../components/common/Button.jsx";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const StudentCoursePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const [reviewModal, setReviewModal] = useState(null);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  console.log("active", active);

  const activeHandler = () => {
  console.log("active", active);
    setActive(prev => !prev)
  }

  useEffect(() => {
    // console.log('hello ji');
    const courseDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(
        setCourseSectionData(courseData?.data?.courseDetails?.courseContent)
      );
      dispatch(setEntireCourseData(courseData?.data));
      dispatch(setCompletedLectures(courseData?.completedVideos));

      // console.log('course data', courseData);
      // console.log("completed lectures", courseData?.completedVideos);
      let totalNoOfLectures = 0;
      courseData?.data?.courseDetails?.courseContent?.forEach((subSec) => {
        totalNoOfLectures += subSec.subSection?.length;
      });

      // console.log('no of lectures', totalNoOfLectures);
      dispatch(setTotalNoOfLectures(totalNoOfLectures));
    };
    courseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-[100%]  bg-[gray] relative justify-between flex ">
        {/* sidebar  */}

       <div
          className={`text-white bg-[gray] z-30  h-[100vh]  relative ${
            active ? "-left-[260px] w-[0] " : " w-[25%] left-[0]"
          } transition-all duration-300 ease-linear `}
        >
          <button type='button'
          onClick={ activeHandler}
            className={` mt-[15px] px-2 top-[0] ${active ?'left-[260px] ' : ' left-0'} absolute block sm:hidden   cursor-pointer bg-yellow-50 text-[black] text-[.8rem]`}
          >
            {!active ? <FaArrowRightLong  /> : <FaArrowLeftLong />}
          </button>
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        <div className={`${active ? 'w-[100%]': 'w-[70%]'} p-8 sm:w-[75%]  justify-center items-center  bg-[gray]`}>
          <Outlet />
        </div>
       </div>
      <div className="absolute top-0 ">
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </>
  );
};

export default StudentCoursePage;
