import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses } from "../../apiServices/apiHandler/courseDetailsAPI"
import CoursesTable from "./InstructorCourses/CoursesTable"
import Button from "../common/Button"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {

    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      // console.log('course by instructor',result);

      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <Button
          btnText="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </Button>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}