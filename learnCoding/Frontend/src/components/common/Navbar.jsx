import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links.js";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Button from "../common/Button.jsx";
import UserProfileDropdown from "../Auth/UserProfileDropDown.jsx";
import { fetchCourseCategories } from "../../apiServices/apiHandler/courseDetailsAPI.js";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { total, totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Left logo / name  */}
        <Link to="/">
          {/* <img src='' width={160} height={42} loading='lazy'/> */}
          <h1 className="text-white text-[1.5rem]">LearnCoding</h1>
        </Link>

        {/* center links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div
                      className="invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 h-auto lg:w-[300px] space-y-2 z-30"
                    >
                      <div
                        className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"
                      ></div>

                      {loading ? (
                        <p className="spinner"></p>
                      ) : category ? (
                        <>
                          {category
                            // ?.filter((cate) => cate?.courses?.length > 0)
                            ?.map((cate, index) => (
                              <Link
                                to={`/catalog/${cate.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={index}
                              >
                                <p>{cate.name} </p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">
                          No Category Found
                        </p>
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

        <div className="flex gap-x-4 justify-center items-center">
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
                linkTo="/login"
              />

              {/* signup button */}
              <Button
                className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md"
                btnText="Sign Up"
                linkTo="/signup"
              />
            </>
          )}

          {token !== null && <UserProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
