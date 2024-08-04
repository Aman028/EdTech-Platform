import { Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Navbar } from "./Components/Common/Navbar";
import { OpenRoute } from "./Components/core/Auth/OpenRoute";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { UpdatePassword } from "./Pages/UpdatePassword";
import { VerifyEmail } from "./Pages/VerifyEmail";
import { About } from "./Pages/About";
import { ContactPage } from "./Pages/ContactPage";
import { PrivateRoute } from "./Components/core/Auth/PrivateRoute";
import { Dashboard } from "./Pages/Dashboard";
import { MyProfile } from "./Components/core/Dashboard/MyProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import picture from "../src/assets-2/Images/WhatsApp Image 2023-12-30 at 03.26.07_d01aeb91.jpg";
import { Error } from "./Pages/Error";
import Settings from "./Components/core/Dashboard/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import { EnrolledCourses } from "./Components/core/Dashboard/EnrolledCourses";
import Cart from "./Components/core/Dashboard/Cart";
import AddCourse from "./Components/core/Dashboard/Add Course/index";
import MyCourses from "./Components/core/Dashboard/MyCourses";
import EditCourse from "./Components/core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/core/ViewCourse/VideoDetails";
import Instructor from "./Components/core/Dashboard/Instructor";
import Success from "./Components/success";
import Cancel from "./Components/cancel";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const [toastStatus, settoastStatus] = useState(true);

  // useEffect(() => {
  //   toast.custom((t) => (
  //     <div
  //       className={`${
  //         t.visible ? 'animate-enter' : 'animate-leave'
  //       } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //     >
  //       <div className="flex-1 w-0 p-4">
  //         <div className="flex items-start">
  //           <div className="flex-shrink-0 pt-0.5">
  //             <img
  //               className="h-10 w-10 rounded-full"
  //               src={picture}
  //               alt=""
  //             />
  //           </div>
  //           <div className="ml-3 flex-1">
  //             <p className="text-sm font-medium text-gray-900">
  //               Yash Sarode
  //             </p>
  //             <p className="mt-1 text-sm text-gray-500">
  //               Backend server using free service may require 10-15 sec to warm-up initially,
  //               sorry for the inconvenience.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex border-l border-gray-200">
  //         <button
  //           onClick={() => toast.dismiss(t.id)}
  //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //         >
  //           Close
  //         </button>
  //       </div>
  //     </div>
  //   ))
  // })
  if (toastStatus) {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img className="h-10 w-10 rounded-full" src={picture} alt="" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Aman Kumar</p>
                <p className="mt-1 text-sm text-gray-500">
                  Backend server is using free hoisting service which may
                  require 8-10 sec to warm-up initially, sorry for the
                  inconvenience.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div> */}
        </div>
      ),
      {
        duration: 4000,
      }
    );
    settoastStatus(false);
  }

  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactPage />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>
        </Route>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
