import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { login } from "../../apiServices/apiHandler/authAPI.js"
import {toast} from 'react-hot-toast'

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth)

  console.log('loading', loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  // on change handler
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  // login handler
  const loginHanlder = (e) => {
    e.preventDefault();

    if(!formData.email && !formData.password ){
      toast.error("Eamil and Passwrod is required")
      return 
    }

    dispatch(login(email, password, navigate));
  };

  return (
    <form
      onSubmit={loginHanlder}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <div className="w-full">
        <Input
          label="Email Addrees"
          required
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          astrick='true'
        />
      </div>

      <div className="w-full relative">
        <Input
          label="Password"
          id="password"
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          astrick='true'
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

        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </div>

      <div className="w-[100%]">
        <Button type="submit"  onClick={loginHanlder} className='w-full py-[10px] bg-yellow-50 text-[1rem]'  btnText="Sign In" />
      </div>
    </form>
  );
}

export default LoginForm;
