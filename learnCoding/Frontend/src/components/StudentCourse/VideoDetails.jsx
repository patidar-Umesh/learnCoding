import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../apiServices/apiHandler/courseDetailsAPI.js";
import { updateCompletedLectures } from "../../store/slices/studentCourseSlice.js";
import {
  Player,
  LoadingSpinner,
  ControlBar,
  ForwardControl,
  ReplayControl,
  BigPlayButton,
  PlaybackRateMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
import Button from "../common/Button.jsx";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.studentCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const videoDetails = async () => {
      if (!courseSectionData?.length) return;

      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        // get first render section
        const sectionData = courseSectionData?.filter(
          (section) => section._id === sectionId
        );

        // console.log("section data", sectionData);

        // get subsection first video
        const subSectionVideo = sectionData?.[0].subSection?.filter(
          (subSec) => subSec._id === subSectionId
        );

        setVideoData(subSectionVideo[0]);
        setVideoEnded(false);
      }
    };
    videoDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    courseSectionData,
    courseEntireData,
    location.pathname,
    courseId,
    navigate,
    sectionId,
    subSectionId,
  ]);

  // first video check handler
  const isFirstVideo = () => {
    // find current section ind from courseSectiondata
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );

    // find current sub section ind from courseSectiondata
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((subSec) => subSec._id === subSectionId);

    // check and validate
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  // last video check handler
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subSec) => subSec._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData?.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  // go to next handler
  const goToNextVideo = () => {
    console.log("next btn clicked");
    // find current section index
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );

    // get total sub sections
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection?.length;

    // find current sub section index
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSec) => subSec._id === subSectionId);

    // validate
    if (currentSubSectionIndex !== noOfSubSections - 1) {
      // get next sub sectionid
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSectionIndex + 1
        ]._id;

      // navigate the video
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // get next sub sectionid
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  // go to previous video handler
  const goToPrevVideo = () => {
    console.log("prev btn clicked");
    // find current section index
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    // find current sub section index
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subSec) => subSec._id === subSectionId);
    console.log("currentSubSectionIndex", currentSubSectionIndex);

    if (currentSubSectionIndex !== 0) {
      // previous sub section id
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;

      console.log(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );

      console.log("currentSubSectionIndex", currentSubSectionIndex);
    } else {
      // get previous section id
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;

      // get previous sub section length
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection?.length;

      // get previous sub section id
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1]?.subSection[
          prevSubSectionLength - 1
        ]._id;

      // navigate the prev section to subsection
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="text-white relative  w-[100%] h-auto">
      {videoEnded && (
        <div className=" w-[100%] mb-2 mx-auto flex justify-around items-center">
          {!completedLectures?.includes(subSectionId) && (
            <div className="mx-10">
              <Button
                disabled={loading}
                className="bg-yellow-50 w-max"
                onClick={() => handleLectureCompletion()}
                btnText={!loading ? "Mark As Completed" : "Loading..."}
              />
            </div>
          )}

          <div className=" flex justify-center gap-x-4 w-full">
            {!isFirstVideo() && (
              <button
                disabled={loading}
                onClick={goToPrevVideo}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Prev
              </button>
            )}
            {!isLastVideo() && (
              <button
                disabled={loading}
                onClick={goToNextVideo}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <Player
          // ref={playerRef}
          autoPlay={true}
          playsInline
          aspectRatio="16:9"
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          {/* play btn  */}
            <BigPlayButton position="center" />

          {/* loading spinner */}
          <LoadingSpinner />

          {/* forward bakcword  */}
          <ControlBar  autoHide={false}>
            <ReplayControl  seconds={5} />
            <ForwardControl seconds={5} />
            <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} order={7.1} />
          </ControlBar>
        </Player>
      )}

      <div className="sm:text-[1rem] text-[.5rem]">
        <h1>{videoData?.title}</h1>
        <p>{videoData?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
