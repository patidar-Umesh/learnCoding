import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../apiServices/apiHandler/courseDetailsAPI.js';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../store/slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/ViewCourse/CourseReviewModal';

const ViewCoursePage = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const courseData = await getFullDetailsOfCourse(courseId, token);
              dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
              let lectures = 0;
              courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[]);


  return (
    <>
        <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div>
                <Outlet />
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>
        
    </>
  )
}

export default ViewCoursePage
