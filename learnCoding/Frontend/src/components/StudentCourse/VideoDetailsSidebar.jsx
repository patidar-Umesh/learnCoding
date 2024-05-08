import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../common/Button.jsx";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.studentCourse);

  useEffect(() => {
    // console.log("entire data", active);

    const setActiveFlags = () => {
      if (!courseSectionData?.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((subSec) => subSec._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  // add review handler
  const handleAddReview = () => {
    setReviewModal(true);
    console.log("handleAddReview");
  };

  const openClosehanlder = (sectionId) => {
    setActiveStatus((prev) => (prev === sectionId ? null : sectionId));
  };
  return (
    <>
      <div className="relative">
        <div className="">
          <div className="sm:mt-[0] mt-[45px]">
            {/* buttons */}
            <div className="sm:ml-4 ml-[2px] mt-4 justify-aroud space-y-2 sm:justify-between items-center flex-col sm:flex">
              <Button
                onClick={() => navigate("/dashboard/enrolled-courses")}
                btnText="Back"
                className="bg-yellow-50 text-[8px]  px-[6px]" 
              />
              <div>
                <Button
                  btnText="Add Review"
                  className="bg-yellow-50 text-[8px]  px-[6px]"
                  onClick={() => handleAddReview()}
                />
              </div>
            </div>
            {/* heading or title */}
            <div className="sm:m-4 m-2 text-[.4rem] sm:text-[1rem]">
              <p>
                <span className="text-[#d4b325]">Course Name : </span>
                {courseEntireData?.courseDetails?.courseTitle}
              </p>
              <p>
                <span className="text-[#d4b325]">Total Videos :</span>{" "}
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>
          </div>

          {/*  sections and subSections */}
          <div className="sm:ml-2 mx-auto px-1 select-none ">
            {courseSectionData?.map((section, index) => (
              <div className="my-1  transition-all duration-300" key={index}>
                {/* section */}
                <div
                  className="bg-[#5c5b5b] text-[] py-1 px-1 sm:py-2 sm:text-[1.5rem] items-center  sm:gap-y-4 flex justify-between cursor-pointer"
                  onClick={() => openClosehanlder(section?._id)}
                >
                  <div className="sm:text-[1rem] text-[.4rem]">
                    {section?.sectionName}
                  </div>
                  {activeStatus === section?._id ? (
                    <FaChevronUp className="text-[.3rem] sm:text-[1rem]" />
                  ) : (
                    <FaChevronDown className="text-[.3rem] sm:text-[1rem]" />
                  )}
                </div>

                {/* subSections */}
                {activeStatus === section?._id && (
                  <div className=" select-none">
                    {section?.subSection?.map((subSec, subIndex) => (
                      <div
                        className={`flex sm:gap-x-5 gap-x-2 gap-y-1 text-[.5rem] sm:text-[1.1rem] sm:p-5 my-1  ${
                          videoBarActive === subSec._id
                            ? "bg-yellow-200 text-richblack-900"
                            : "bg-pure-greys-600 text-white"
                        }`}
                        key={subIndex}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?.courseDetails?._id}/section/${section?._id}/sub-section/${subSec?._id}`
                          );
                          setVideoBarActive(subSec?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="text-[.5rem] sm:text-[1rem]"
                          checked={completedLectures?.includes(subSec?._id)}
                          onChange={() => {}}
                        />
                        <span className="w-full items-center overflow-x-hidden ">{subSec.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
