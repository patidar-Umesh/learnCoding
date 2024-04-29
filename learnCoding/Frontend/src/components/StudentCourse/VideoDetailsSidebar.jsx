import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../common/IconBtn';
import { FaChevronDown, FaChevronUp  } from "react-icons/fa";

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const [active, setActive] = useState(true)

    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.studentCourse);

    useEffect(()=> {
        console.log("entire data",active);
        const setActiveFlags = () => {
            if(!courseSectionData?.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname, active])


    // add review handler
    // const handleAddReview = () => {
    //     console.log("I am inside Add handleAddReview")
    //     setReviewModal(true);
    // }

  return (
    <>
        <div className='text-white'>
            {/*  buttons and headings */}
            <div>
                {/* buttons */}
                <div className=''>
                    <button 
                    onClick={()=> {
                        navigate("/dashboard/enrolled-courses")
                    }}
                    >
                        Back
                    </button>

                    <div>
                        <IconBtn 
                            text="Add Review"
                            onclick={()=>  setReviewModal(true)}
                        />
                    </div>

                </div>
                {/* heading or title */}
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/*  sections and subSections */}
            <div>
                {
                    courseSectionData?.map((section, index)=> (
                        <div className='my-2'
                        onClick={() => setActiveStatus(section?._id)}
                        key={index}
                        >

                            {/* section */}

                            <div className='bg-[gray] px-1 py-2 items-center gap-y-4 flex justify-between' > 
                                <div >
                                    {section?.sectionName}
                                </div>
                                <FaChevronUp/> 
                            </div>

                            {/* subSections */}
                            <div>
                                {
                                    activeStatus === section?._id && (
                                        <div>
                                            {
                                                section.subSection.map((subSec, index) => (
                                                    <div
                                                    className={`flex gap-x-5 gap-y-1 p-5 ${
                                                        videoBarActive === subSec._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-pure-greys-600 text-white"
                                                    }`}
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSec?._id}`
                                                        )
                                                        setVideoBarActive(subSec?._id);
                                                    }}
                                                    >
                                                        <input
                                                        type='checkbox'
                                                        checked= {completedLectures.includes(subSec?._id)}
                                                        onChange={() => {}}
                                                        />
                                                        <span>
                                                            {subSec.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar
