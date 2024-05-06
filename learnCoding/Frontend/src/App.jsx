// import 'globalthis/auto'
import { Route, Routes } from "react-router-dom";
import {
  AboutPage,
  CatalogPage,
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
  ViewCoursePage,
} from "./pages/index.js";
import Navbar from "./components/common/Navbar";
import Settings from "./components/Profile/settings.jsx";
import MyProfile from "./components/Profile/MyProfile.jsx";
import EnrolledCourses from "./components/Profile/EnrolledCourses.jsx";
import VideoDetails from "./components/ViewCourse/VideoDetails.jsx";
import OpenRoute from './components/Auth/OpenRoute.jsx'
import PrivateRoute from './components/Auth/PrivateRoute.jsx'
import {useSelector} from 'react-redux'
import {ACCOUNT_TYPE} from './utils/constants.js'
import Cart from "./components/Instructor/Cart/Cart.jsx";
import Instructor from "./components/Instructor/InstructorDashboard/Instructor.jsx";
import AddCourse from "./components/Instructor/AddCourse/AddCourse.jsx";
import MyCourses from './components/Instructor/MyCourses.jsx'
import EditCourse from './components/Instructor/EditCourse/EditCourse.jsx'

const App = () => {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
     <div className="mt-[50px]">
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog/:catalogName" element={<CatalogPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignupPage />
             </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
             <OpenRoute>
              <LoginPage />
             </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPasswordPage />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmailPage />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePasswordPage />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          element={
            <PrivateRoute>
              <DashboardPage  />
            </PrivateRoute>
          }
        >
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

        <Route
          element={
            <PrivateRoute>
              <ViewCoursePage />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
     </div>
    </div>
  );
};

export default App;
