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

const StudentCoursePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const [reviewModal, setReviewModal] = useState(null);
  const dispatch = useDispatch();

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
      console.log("completed lectures", courseData?.completedVideos);
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
      <div className="w-[100%] relative flex gap-x-3">
        {/* sidebar  */}

        <div className="w-[25%]">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>
        <div className="w-[100%] p-8 flex justify-center items-center  bg-[gray]">
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
