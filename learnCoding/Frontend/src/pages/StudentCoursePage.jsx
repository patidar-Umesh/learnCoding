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
  const [reviewModal, setReviewModal] = useState(false);
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
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection?.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    courseDetails();
  }, []);

  return (
    <>
      <div className="w-[100%]  flex gap-x-3" >
        {/* sidebar  */}

        <div className="w-[25%]">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>
        <div className="w-[100%] p-8 flex justify-center items-center  bg-[gray]">
          <Outlet />
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </>
  );
};

export default StudentCoursePage;
