import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../apiServices/apiHandler/courseDetailsAPI.js";
import { getInstructorData } from "../../../apiServices/apiHandler/profileAPI.js";
import InstructorChart from "./InstructorChart.jsx";
import { Link } from "react-router-dom";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);

      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      // console.log("instructor Api Data", instructorApiData);

      if (instructorApiData.length) setInstructorData(instructorApiData);

      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="text-white">
      <div>
        <h1>Hi {user?.firstName}</h1>
        <p>Let's start something new</p>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[80vh] ">
            <div className="spinner mx-auto"></div>
        </div>
      ) : courses.length > 0 ? (
        <div>
          <div className=" h-[270px] bg-[] sm:h-[500px] ">
            <div className="flex h-[100%]  gap-x-4 justify-around items-center">
              {/* left section */}
              <div className="w-1/2 h-[100%]">
                <InstructorChart courses={instructorData} />
              </div>

              {/* right section */}
              <div className="  bg-richblack-700  h-[200px] sm:h-[370px] mt-6 flex flex-col items-c justify-around sm:p-10 p-1 sm:gap-y-10 text-center  w-1/3">
                
                <p className="font-bold text-richblack-100 text-left w-full">
                  Statistics
                </p>
                <div>
                  <p className="font-bold text-left text-richblack-300">
                    Total Courses{" "}
                    <span className="text-white ml-[100px]">
                      {courses.length}{" "}
                    </span>
                  </p>

                  <p className="font-bold text-left text-richblack-300">
                    Total Enrolled Students{" "}
                    <span className="text-white ml-[30px]">
                      {totalStudents}
                    </span>
                  </p>

                  <p className="font-bold text-left text-richblack-300">
                    Total Income{" "}
                    <span className="text-white ml-[80px]">{totalAmount}</span>
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>

            {/* Render 3 courses */}
          <div className="bg-[]">
            <div className=" w-full flex justify-between items-center p-4">
              <p>Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-[yellow]">View all</p>
              </Link>
            </div>
            <div className="flex bg-[]">
              {courses.slice(0, 3).map((course) => (
                <Link key={course._id} to={`/courses/${course?._id}`}>
                <div  className="w-[150px] h-[150px] sm:w-[300px] sm:h-[300px]">
                  <img
                  alt="img"
                    className="sm:h-[200px] h-[100px] w-[100px] sm:w-[200px] object-cover"
                    src={course.image}
                  />
                  <div className="text-[.7rem]">
                    <p>{course.courseTitle}</p>
                    <div className="flex sm:flex-row flex-col sm:gap-x-2">
                      <p>{course.studentsEnrolled.length} Students Enrolled</p>
                      <p className="hidden sm:block"> | </p>
                      <p> Rs {course.price}</p>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not created any courses yet</p>
          <Link to={"/dashboard/add-course"}>Create a Course</Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
