import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/home/HighlightText.jsx";
import Button from "../components/common/Button.jsx";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/home/CodeBlocks.jsx";
import TimelineSection from "../components/home/TimelineSection.jsx";
import LearningLanguageSection from "../components/home/LearningLanguageSection.jsx";
import ExploreMore from "../components/home/ExploreMore.jsx";
import InstructorSection from "../components/home/InstructorSection.jsx";
import ReviewSlider from "../components/common/ReviewSlider.jsx";
import Footer from "../components/common/Footer.jsx";
import CourseSlider from "../components/Catalog/CourseSlider.jsx";
import { apiConnector } from "../apiServices/apiConnector.js";
import { courseEndpoints } from "../apiServices/apis.js";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [course, setCourse] = useState([]);
  // console.log("courses", course);

  useEffect(() => {
    const getall = async () => {
      try {
        const response = await apiConnector(
          "GET",
          courseEndpoints.GET_ALL_COURSE_API
        );

        if (!response?.data?.success) {
          throw new Error("Could Not Fetch Course Categories");
        }
        setCourse(response?.data?.data);
        // console.log("courses ", response?.data?.data);
      } catch (error) {
        console.log("Get Course api error", error);
        toast.error(error.message);
      }
      // toast.dismiss(toastId);
    };

    getall();
  }, []);

  return (
    <div>
      {/*Section1  */}
      <div
        className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between"
      >
        <Link to={"/signup"}>
          <div
            className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <Button
            className="bg-yellow-50 text-black"
            linkto={"/signup"}
            btnText="Learn More"
          />

          <Button
            className="bg-richblack-200 text-black"
            linkto={"/login"}
            btnText=" Book a Demo"
          />
        </div>

        <div className="mx-3 my-12 shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              btnText: "try it yourself",
              linkto: "/signup",
            }}
            btn2={{
              btnText: "learn more",
              linkto: "/login",
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold ">
                Unlock Your
                <HighlightText
                  text={"coding potential"}
                  className="font-medium"
                />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>
        <ExploreMore />
      </div>

      {/*Section exlore more  */}

      {/*Section 2  */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="flex flex-row gap-7 text-white ">
              <Button linkto={"/signup"} btnText="Explore Full Catalog">
                <div className="flex items-center gap-3">
                  <FaArrowRight />
                </div>
              </Button>

              <Button
                className="bg-yellow-50"
                linkto={"/signup"}
                btnText="Learn more"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern learnCoding is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button  className="bg-yellow-50" linkto={"/signup"} btnText="Learn more" />
            </div>
          </div>
          {/* time line */}
          <TimelineSection />
          {/* learning section */}
          <LearningLanguageSection />
        </div>
      </div>

      {/*Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        {/* this is course slider herer */}
        <CourseSlider Courses={course} nextPrevBtn='true' />

        {/* instructor section */}
        <InstructorSection />

        <h2 className="text-center text-4xl font-semobold mt-10">
          review from Other Learners
        </h2>

        {/* Review Slider here */}
        <ReviewSlider />
      </div>

      {/*Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
