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
    };

    getall();
  }, []);

  return (
    <div>
      {/*Section1  */}
      <div
        className="mx-auto mt-[20px] flex flex-col w-11/12 max-w-maxContent items-center 
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
          <Link to='/signup' >
          <Button
            className="bg-yellow-50 text-black"
            btnText="Learn More"
            />
          </Link>
          <Link to='/login' >

          <Button
            className="bg-richblack-200 text-black"
            btnText=" Book a Demo"
          />
          </Link>

        </div>

        <div className="mx-3 my-12 shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div className="">
          <CodeBlocks
            position={"lg:flex-row w-full flex-col"}
            heading={
              <div className="sm:text-4xl w-full text-[2rem] font-semibold">
                Unlock Your <HighlightText text={"coding potential "} />
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
            codeblock={`<!DOCTYPE html>
            <html lang="en">
            <head>
              <title>LearnCoding</title>
              <link rel="stylesheet" href="style.css">
            </head>
            <body>
              <h1>LearnCoding</h1>
            </body>
            </html>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"sm:flex-row-reverse w-full flex-col"}
            heading={
              <div className="text-4xl font-semibold ">
                Unlock Your
                <HighlightText
                  text={"coding potential "}
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
            codeblock={`<!DOCTYPE html>
            <html lang="en">
            <head>
              <title>LearnCoding</title>
              <link rel="stylesheet" href="style.css">
            </head>
            <body>
              <h1>LearnCoding</h1>
            </body>
            </html>`}
            codeColor={"text-yellow-25"}
          />
        </div>
        <ExploreMore />
      </div>

      {/*Section exlore more  */}

      {/*Section 2  */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px] hidden">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="flex flex-row gap-7 text-white ">
              <Link to="/signup">
                <Button btnText="Explore Full Catalog">
                  <div className="flex items-center gap-3">
                    <FaArrowRight />
                  </div>
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-yellow-50" btnText="Learn more" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-[200px] sm:mt-[200px] w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-5 mb-0 mt-0 sm:mb-10 sm:mt-[95px]">
            <div className="text-4xl font-semibold w-[100%] sm:w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[100%] sm:w-[40%] items-start">
              <div className="text-[16px]">
                The modern learnCoding is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Link to="/signup">
                <Button className="bg-yellow-50" btnText="Learn more" />
              </Link>
            </div>
          </div>
          {/* time line */}
          <TimelineSection />
          {/* learning section */}
          <div className="sm:block hidden">
            <LearningLanguageSection />
          </div>{" "}
        </div>
      </div>

      {/*Section 3 */}
      <div className="w-11/12 mx-auto mt-[50px] max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        {/* this is course slider herer */}
        <div className="" id="courses">
          <CourseSlider Courses={course} nextPrevBtn="true" />
        </div>

        {/* instructor section */}
        <InstructorSection />

        <h2 className="text-center text-4xl font-semobold mt-10">
          Review from Other Learners
        </h2>

        {/* Review Slider here */}
        <ReviewSlider />
      </div>

      {/*Footer */}
      <Footer id="footer1" />
    </div>
  );
};

export default HomePage;
