import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import { changePassword } from "../../apiServices/apiHandler/SettingsAPI";
import Button from "../common/Button";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState(false);

  const getValue = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("password Data - ", formData);
  };

  const changePasswordHandler = async (e) => {
    console.log("btn clicked");
    e.preventDefault();
    if (formData.newPassword === "" || formData.oldPassword === "") {
      setError(true);
      return;
    }

    try {
      await changePassword(formData, token);
    } catch (error) {
      console.log("Password not changed", error.message);
    }
  };

  return (
    <>
      <form>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <Input
                label="Current Password"
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                onChange={getValue}
                placeholder="Enter Current Password"
                error={error && "Please enter your New Password."}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <Input
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                onChange={getValue}
                placeholder="Enter New Password"
                error={error && "Please enter your New Password."}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Link to="/dashboard/my-profile">
            <Button
              btnText="Cancel"
              type="button"
              className="bg-[gray]"
            />
          </Link>

          <Button
            onClick={changePasswordHandler}
            type="submit"
            btnText="Update"
            className="bg-yellow-50 "
          />
        </div>
      </form>
    </>
  );
}
