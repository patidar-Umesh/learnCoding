import { Route, Routes } from "react-router-dom";
import {
  AboutPage,
  CategoryCoursePage,
  ContactPage,
  CourseDetailsPage,
  DashboardPage,
  ErrorPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  SignupPage,
  UpdatePasswordPage,
  VerifyEmailPage,
  StudentCoursePage,
} from "./pages/index.js";
import Navbar from "./components/common/Navbar.jsx";
import Settings from "./components/Profile/settings.jsx";
import MyProfile from "./components/Profile/MyProfile.jsx";
import EnrolledCourses from "./components/Profile/EnrolledCourses.jsx";
import VideoDetails from "./components/StudentCourse/VideoDetails.jsx";
import OpenRoute from "./components/Auth/OpenRoute.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants.js";
import Cart from "./components/Instructor/Cart/Cart.jsx";
import Instructor from "./components/Instructor/InstructorDashboard/Instructor.jsx";
import AddCourse from "./components/Instructor/AddCourse/AddCourse.jsx";
import MyCourses from "./components/Instructor/MyCourses.jsx";
import EditCourse from "./components/Instructor/EditCourse/EditCourse.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
      
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <div className="mt-[50px]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/category/:categoryName"
          element={<CategoryCoursePage />}
        />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

        <Route
          path="/signup"
          element={<SignupPage />} 
        />
        <Route path="/login"  element={<LoginPage />} />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />} 
        />

        <Route
          path="/verify-email"
          element={<VerifyEmailPage />} 
        />

        <Route
          path="/reset-password/:token"
          element={<UpdatePasswordPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

          <Route element={<DashboardPage/>}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/Settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/dashboard/cart" element={<Cart />} />
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/instructor" element={<Instructor />} />
              <Route path="/dashboard/add-course" element={<AddCourse />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route element={<StudentCoursePage/>}></Route>
              <Route
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
