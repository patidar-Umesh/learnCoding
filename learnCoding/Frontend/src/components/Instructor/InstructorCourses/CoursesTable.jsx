import { useSelector } from "react-redux"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../apiServices/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../apiServices/apiHandler/courseDetailsAPI"
import { COURSE_STATUS } from "../../../utils/constants"
import ConfirmationModal from "../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  const [confirmationModal, setConfirmationModal] = useState(null)
  const trUNCATE_LENGth = 30

  const handleCourseDelete = async (courseId) => {

    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)

    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
      
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <table className="rounded-xl border border-richblack-800 ">
        <thead>
          <tr className="flex gap-x-2 sm:gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <th className="flex-1 text-left text-[.6rem] sm:text-sm font-medium uppercase text-richblack-100">
              Courses
            </th>
            <th className="text-left text-[.6rem] sm:text-smfont-medium uppercase text-richblack-100">
              Duration
            </th>
            <th className="text-left text-[.6rem] sm:text-sm font-medium uppercase text-richblack-100">
              Price
            </th>
            <th className="text-left text-[.6rem] sm:text-sm font-medium uppercase text-richblack-100">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {courses?.length === 0 ? (
            <tr>
              <td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </td>
            </tr>
          ) : (
            courses?.map((course) => (
              <tr
                key={course._id}
                className="flex gap-x-2 sm:gap-x-10 border-b border-richblack-800  px-6 py-8"
              >
                <td className="flex flex-1 gap-1 sm:gap-x-4">
                  <img
                    src={course?.image}
                    alt={course?.courseName}
                    className="sm:h-[148px] h-[100px] w-[100px] sm:w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex ml-2 flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      trUNCATE_LENGth
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, trUNCATE_LENGth)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[20px] font-medium text-pink-100">
                        <HiClock size={14}  />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </td>
                <td className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </td>
                <td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </td>
                <td className="text-sm font-medium text-richblack-100 ">

                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  <button
                  
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1  transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}