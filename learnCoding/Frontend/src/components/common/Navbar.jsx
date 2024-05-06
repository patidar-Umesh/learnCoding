import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links.js";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Button from "../common/Button.jsx";
import UserProfileDropdown from "../Auth/UserProfileDropDown.jsx";
import { fetchCourseCategories } from "../../apiServices/apiHandler/courseDetailsAPI.js";
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { logout } from "../../apiServices/apiHandler/authAPI.js";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { total, totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  // make api calls for category

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const result = await fetchCourseCategories();

      if (result?.length > 0) {
        setCategory(result);
      }
      setLoading(false);
    };

    getCategories();
  }, []);

  const dropDown = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="fixed  w-full z-50 bg-richblack-700 shadow-lg">
      <div className="flex h-14   items-center  justify-center  border-b-[1px] border-b-richblack-700">
        <div className="flex w-11/12    max-w-maxContent items-center justify-between">
          {/* Left logo / name  */}
          <Link to="/">
            {/* <img src='' width={160} height={42} loading='lazy'/> */}
            <h1 className="text-white text-[1.5rem]">LearnCoding</h1>
          </Link>

          {/* center links */}
          <nav>
            <ul className="sm:flex invisible sm:visible  gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Courses" ? (
                    <div className="relative flex items-center gap-2 group">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div className="absolute invisible top-[28px] left-1/2 transform -translate-x-1/2 translate-y-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 h-auto lg:w-[300px] space-y-2 z-50">
                        <div className="absolute left-[50%] top-0 transform -translate-x-1/2 translate-y-[-45%] h-6 w-6 rotate-45 z-50 rounded bg-richblack-5"></div>

                        {loading ? (
                          <p className="spinner"></p>
                        ) : category ? (
                          <>
                            {category.map((cate, index) => (
                              <Link
                                to={`/category/${cate.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={index}
                              >
                                <p>{cate.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Category Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          location.pathname === link?.path
                            ? "text-yellow-25"
                            : "text-richblack-50"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right-  Login/SignUp/Dashboard */}

          <div className="sm:flex invisible sm:visible  gap-x-4 justify-center items-center">
            {user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-white text-[1.5rem]" />
                {total > 0 && (
                  <span className="absolute bottom-0 top-[-13px] right-[5px] text-[12px]  text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <>
                {/* Login button */}
                <Button
                  className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md"
                  btnText="Log in"
                  onClick={() => navigate("/login")}
                />

                {/* signup button */}
                <Button
                  className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md"
                  btnText="Sign Up"
                  onClick={() => navigate("/signup")}
                />
              </>
            )}

            {token !== null && <UserProfileDropdown />}
          </div>

          {/* Mobile screen menu */}
          <div
            className="sm:hidden z-[999] bg-[orange]  relative text-[2rem] text-white block"
            onClick={dropDown}
          >
            {!show ? (
              <IoIosMenu />
            ) : (
              <RxCross1 className="text-[1.8rem]" />
            )}
          </div>
          {show && (
            <div className="z-20 absolute top-1 -right-[12px] font-normal bg-[#868585]  divide-y divide-gray-100 rounded-lg shadow w-[100vw] overflow-hidden h-[50vh] dark:bg-gray-700 dark:divide-gray-600 text-white transition-all">
              <ul
                onClick={dropDown}
                class="py-2 text-[1.5rem] font-semibold flex-col flex justify-center items-center text-gray-700 dark:text-gray-400"
              >
                {token ? (<>
                  <Link onClick={() => dispatch(logout(navigate))}>
                    <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >
                      Logout
                    </li>
                  </Link>
                  <Link to='/dashboard/my-profile'>
                  <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >
                    Dashboard
                  </li>
                </Link>
                </>
                ) : (
                  <>
                    <Link to="/login">
                      <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Login
                      </li>
                    </Link>
                    <Link to="/signup">
                      <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        SingUp
                      </li>
                    </Link>
                  </>
                )}
                <Link to="/#footer1">
                  <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Courses
                  </li>
                </Link>
                <Link to="/about">
                  <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    About Us
                  </li>
                </Link>
                <Link to="/contact">
                  <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Contact Us
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
