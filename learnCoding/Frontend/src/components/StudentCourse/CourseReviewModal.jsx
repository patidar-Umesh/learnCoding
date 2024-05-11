import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createRating } from "../../apiServices/apiHandler/courseDetailsAPI";
import ReactStars from "react-rating-stars-component";
import Button from "../common/Button";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.studentCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // console.log("course data is", courseEntireData?.courseDetails?._id);
    setValue("courseExperience", "");
    setValue("courseRating", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [setValue]);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const ratingAndReviewHandler = async (data) => {
    // console.log('rating .....');
    await createRating(
      {
        courseId: courseEntireData?.courseDetails?._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };


  return (
    <div className="fixed inset-0 z-[1000] !mt-0 flex justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        { setReviewModal &&
      <div className="bg-[gray] h-[220px] w-[200px] sm:h-auto sm:w-auto p-4 rounded-lg">
        {/* Modal Body */}
        <div className="text-white ">
          <div className="flex text-[.6rem] sm:text-[1rem] flex-col items-center justify-center">
            <img
            alt=""
              src={user?.image}
              className="aspect-square w-[25px] sm:w-[50px] rounded-full object-cover"
            />
            <div>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p>Posting Publicly</p>
            </div>
          </div>

          <form
            // onSubmit={handleSubmit(ratingAndReviewHandler)}
            className="sm:mt-6 mt-1 sm:text-[1rem] text-[.6rem] flex flex-col items-center"
          >
            <ReactStars
              count={5}
              color='white'
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />

            <div>
              <label htmlFor="courseExperience">Add Your Experience*</label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience here"
                {...register("courseExperience", { required: true })}
                className={` rounded-lg bg-richblack-700 p-3 text-[.6rem] sm:text-[16px] leading-[10px] sm:leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 w-full  placeholder:text-richblack-400  `}
              />
              {errors.courseExperience && (
                <span>Please add your experience</span>
              )}
            </div>
            {/* Cancel and Save button */}
            <div className="flex justify-around w-full mb-4">
              <Button onClick={ ()=>setReviewModal(false)} btnText="Cancel"  className='bg-yellow-200' />
              <Button btnText="save" type="submit" onClick={handleSubmit(ratingAndReviewHandler)} className='bg-yellow-200' />
            </div>
          </form>
        </div>
      </div>
}
    </div>
  );
};

export default CourseReviewModal;
