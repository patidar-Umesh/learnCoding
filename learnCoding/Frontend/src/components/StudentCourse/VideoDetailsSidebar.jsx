import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../common/Button";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [active, setActive] = useState(true);

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
    console.log("entire data", active);

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
  }, [courseSectionData, courseEntireData, location.pathname, active]);

  // add review handler
  const handleAddReview = () => {
    setReviewModal(true);
    console.log("handleAddReview",);
  };

 

  const openClosehanlder = (sectionId) => {
    setActiveStatus((prev) => (prev === sectionId ? null : sectionId));
  };
  return (
    <>
      <div className="text-white">
        <div>
          {/* buttons */}
          <div className="ml-4 mt-4 justify-between items-center flex">
            <Button
              onClick={() => navigate('/dashboard/enrolled-courses')}
              btnText="Back"
              className="bg-yellow-50"
            />
            <div>
              <Button
                btnText="Add Review"
                className="bg-yellow-50"
                onClick={()=>handleAddReview()}
              />
            </div>
          </div>
          {/* heading or title */}
          <div className="m-4">
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
        <div className="ml-2 select-none ">
          {courseSectionData?.map((section, index) => (
            <div className="my-1" key={index}>
              {/* section */}
              <div
                className="bg-[gray] text-[]  px-1 py-2 items-center gap-y-4 flex justify-between cursor-pointer"
                onClick={() => openClosehanlder(section?._id)}
              >
                <div>{section?.sectionName}</div>
                {activeStatus === section?._id ? (
                  <FaChevronUp  />
                ) : (
                  <FaChevronDown  />
                )}
              </div>

              {/* subSections */}
              {activeStatus === section?._id && (
                <div className=" select-none transition-transform duration-200 ease-in-out">
                  {section?.subSection?.map((subSec, subIndex) => (
                    <div
                      className={`flex gap-x-5 gap-y-1 p-5 my-1  ${
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
                        checked={completedLectures?.includes(subSec?._id)}
                        onChange={() => {}}
                      />
                      <span>{subSec.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
