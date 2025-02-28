import {  useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import NestedView from "./NestedView";
import { useDispatch, useSelector } from "react-redux";
import {
  createSection,
  updateSection,
} from "../../../apiServices/apiHandler/courseDetailsAPI.js";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../store/slices/courseSlice.js";
import Input from "../../common/Input.jsx";
import Button from "../../common/Button.jsx";

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("course id", course);
  // });

  // handle form submission
  const sectionUpdateHandler = async (data) => {
    console.log(data);
    setLoading(true);

    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    if (result) {
      console.log("section result", result);
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const goToNext = () => {
    if (course.courseContent?.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection?.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form  className="space-y-4">

        <div className="flex flex-col space-y-2">
          <Input
            label=" Section Name "
            id="sectionName"
            astrick="true"
            placeholder="Add a section to build your course"
            register={{ ...register("sectionName", { required: true }) }}
            error={errors.sectionName && "Section name is required"}
          />
        </div>

        <div className="flex items-start gap-x-2">
          <Button
            type="submit"
            disabled={loading}
            className='px-5 flex bg-yellow-50'
            onClick={handleSubmit(sectionUpdateHandler)}
            btnText={editSectionName ? "Edit Section Name" : "Create Section"}
            children={
              <IoAddCircleOutline size={20} className="ml-2" />
            }
          />

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">

        <Button
          onClick={goBack}
         btnText='Back'
        />

        <Button
          btnText="Next"
          onClick={goToNext}
          className='bg-yellow-50 flex items-center '
          children={<MdNavigateNext className="ml-1 font-extrabold text-[1.5rem]" />}
        />
      </div>
    </div>
  );
}
