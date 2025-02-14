import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../../apiServices/apiHandler/authAPI";
import { setSignupData } from "../../store/slices/authSlice";
import { ACCOUNT_TYPE } from "../../utils/constants.js";
import Tab from "../common/Tab"
import Input from "../common/Input";
import Button from "../common/Button";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    console.log('firstName', lastName, email, password, confirmPassword);
    e.preventDefault();

     if (!formData.firstName || !formData.lastName ||!formData.email ||
      !formData.password || !formData.confirmPassword ) {
      toast.error("All fields are required for create account")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType
    };

    dispatch(setSignupData(signupData));
    
    // dispatch(sendOtp(formData.email, navigate));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        navigate
      )
    );
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit}  className="flex  w-full flex-col gap-y-4">
        <div className="flex  flex-wrap gap-5 ">
          {/* First name */}
          <div className="flex flex-col gap-2 lg:w-[45%]">
            <Input
              label="First Name"
              type="text"
              onChange={handleOnChange}
              value={firstName}
              name="firstName"
              id="firstName"
              placeholder="Enter your First name"
              astrick="true"
              required
            />
          </div>

          {/* last name */}
          <div className="flex flex-col gap-2 lg:w-[45%]">
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              id="lastname"
              onChange={handleOnChange}
              value={lastName}
              placeholder="Enter last  your  name"
              required
              astrick="true"
            />
          </div>

          {/* email */}
          <div className="lg:w-[95%]">
            <Input
              label="Email Addrees"
              required
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              astrick="true"
            />
          </div>

          {/* password */}
          <div className="lg:w-[45%] relative ">
            <Input
              label="Password"
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handleOnChange}
              astrick="true"
              placeholder="Enter Password"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[45px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          {/* confirm pass */}
          <div className="lg:w-[45%] relative ">
            <Input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              astrick="true"
              label="Confirm Password"
              className="relative"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[45px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          {/* submit btn */}
            <Button
            onClick={handleOnSubmit}
              type="submit"
              className="w-full text-[1rem] py-[12px] bg-yellow-50"
              btnText="Create Account"
              active="true"
            />

        </div>
      </form>
    </div>
  );
}

export default SignupForm;
