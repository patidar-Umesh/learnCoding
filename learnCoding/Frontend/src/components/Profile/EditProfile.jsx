import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../apiServices/apiHandler/SettingsAPI";
// import IconBtn from "../common/IconBtn"
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const genders = ["Male", "Female", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    console.log("data is", data);
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data));
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <Input
                label=" First Name"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                register={{ ...register("firstName", { required: true }) }}
                defaultValue={user?.firstName}
                error={errors.firstName && "Please enter your first name."}
              />
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <Input
                label=" Last Name"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                register={{ ...register("lastName", { required: true }) }}
                defaultValue={user?.lastName}
                error={errors.lastName && "Please enter your last name."}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <Input
                label=" Date of Birth"
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                register={{
                  ...register("dateOfBirth", {
                    required: {
                      value: true,
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future.",
                    },
                  }),
                }}
                defaultValue={user?.dateOfBirth}
                error={errors.dateOfBirth && "Please enter your Date of Birth."}
              />
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="font-[500] text-white text-[.9rem] mb-1">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 w-full  placeholder:text-richblack-400 focus:outline-none  "
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <Input
                label=" Contact Number"
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                register={{...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}}
                defaultValue={user?.additionalDetails?.contactNumber}
                error={
                  errors.contactNumber && `${errors.contactNumber.message}`
                }
              />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <Input
                label="About"
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                register={{...register("about", { required: true })}}
                defaultValue={user?.additionalDetails?.about}
                error={errors.about && " Please enter your About."}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            btnText="Cancel"
            linkTo="/dashboard/my-profile"
            className="text-white"
          />

          <Button
            btnText="Save"
            linkTo="/dashboard/my-profile"
            type="submit"
            onClick={handleSubmit(submitProfileForm)}
            active="true"
          />
        </div>
      </form>
    </>
  );
}
