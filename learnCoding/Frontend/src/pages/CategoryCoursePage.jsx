import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer.jsx";
import { useParams } from "react-router-dom";
import { apiConnector } from "../apiServices/apiConnector.js";
import { courseEndpoints } from "../apiServices/apis.js";
import { getCategoryPageData } from "../apiServices/apiHandler/pageAndComponentData.js";
import CourseCard from "../components/Catalog/CourseCard.jsx";
import CourseSlider from "../components/Catalog/CourseSlider.jsx";
import { useSelector } from "react-redux";
import ErrorPage from './ErrorPage.jsx'



const CategoryCoursePage = () => {
  const { loading } = useSelector((state) => state.profile);
  const { categoryName } = useParams();
  const [active, setActive] = useState(1);
  const [categoryPageData, setCategoryPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API);
      // console.log('categories', res);

      const category_id = res?.data?.data?.filter(
        (cate) => cate.name.split(" ").join("-").toLowerCase() === categoryName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);


  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCategoryPageData(categoryId);
        setCategoryPageData(res);
        // console.log("courses page data", categoryPageData?.data?.selectedCategory?.name);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (loading || !categoryPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!loading && !categoryPageData.success) {
    return <ErrorPage />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab  flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Category/ `}
            <span className="text-yellow-25">
              { categoryPageData?.data?.selectedCategory?.name}
            </span>
          </p>

          <p className="text-3xl text-white">
            { categoryPageData?.data?.selectedCategory?.name}
          </p>

          <p className="max-w-[870px] text-white">
            { categoryPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 (Most popular) */}
      <section className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-white">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>

        {/* Course slider */}
        <div>
          <CourseSlider
            Courses={categoryPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </section>

      {/* Section 2 (Top courses) */}
      <section className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-white">
          Top courses in {categoryPageData?.data?.differentCategory?.name}
        </div>

        {/* course slider */}
        <div className="py-8">
          <CourseSlider
            nextPrevBtn={`${categoryPageData?.data?.differentCategory && 'true'}`}
            Courses={categoryPageData?.data?.differentCategory}
          />
        </div>
      </section>

      {/* Section 3 (Frequently Bought) */}
      <section className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className=" text-white">Frequently Bought</div>
        <div className="py-8">
          <div className="flex flex-wrap gap-8">
            {/* course card without slider */}
            {categoryPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} />
              ))}
          </div>
        </div>
      </section>

      {/* footer  */}
      <Footer />
    </>
  );
};

export default CategoryCoursePage;
