import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import Button from "../common/Button";
import { apiConnector } from "../../apiServices/apiConnector";
import { contactusEndpoint } from "../../apiServices/apis";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("btn clicked");
    console.log("Form Data - ", data);
    try {
      setLoading(true);
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      console.log("Email Res - ", res);
      toast.success('Email Sent Successfully')
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="border  border-richblack-600 text-richblack-300 rounded-xl p-6 lg:p-14 flex gap-3 flex-col">
      <h1 className="sm:text-4xl text-[1.5rem] sm:leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      {/* contact from */}
      <div className="mt-7">
        <form className="flex flex-col ">
          <div className="flex flex-col bg-red-500 flex-wrap gap-5 lg:flex-row">
            {/* First name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <Input
                label="First Name"
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter your First naem"
                register={{...register("firstname", { required: true })}}
                error={errors.firstname && "   Please enter your firstname."}
              />
            </div>

            {/* last name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <Input
                label="Last Name"
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last  your  name"
                className=""
                register={{...register("lastname", { required: true })}}
                error={errors.lastname && "   Please enter your last name."}
              />
            </div>

            {/* email  */}
            <div className="flex flex-col gap-2 lg:w-[100%] ">
              <Input
                label="Eamil Address"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email "
                className=""
                register={{ ...register("email", { required: true }) }}
                error={errors.email && "  Please enter your email name."}
              />
            </div>

            {/* phone number */}
            <div className="flex justify-center items-center gap-5 lg:w-[100%]">
              <div className="flex w-[81px] flex-col lg:w-[20%] gap-2">
                <label className="font-[500] text-white text-[1rem] w-max">
                  Phone Nubmer
                </label>
                <select
                  type="text"
                  name="code"
                  id="code"
                  className="rounded-lg  bg-richblack-700 lg:w-[75%] p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                  {...register("countrycode", { required: true })}
                >
                  {CountryCode?.map((code, index) => {
                    return (
                      <option key={index} defaultValue="+91" value={code.code}>
                        {code.code} -{code.country}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex w-[calc(100%-90px)] flex-col gap-2 lg:w-full">
                <Input
                  type="number"
                  name="phonenumber"
                  id="phonenumber"
                  className="mt-5"
                  placeholder="12345 67890"
                  register={{
                    ...register("phonenumber", {
                      required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                      },
                      maxLength: { value: 12, message: "Invalid Phone Number" },
                      minLength: { value: 10, message: "Invalid Phone Number" },
                    }),
                  }}
                  error={errors.phoneNo && `${errors.phonenumber.message}`}
                />
              </div>
            </div>

            {/* text area */}
            <div className="flex flex-col lg:w-full gap-2">
              <label
                htmlFor="message"
                className="font-[500] text-white text-[1.2rem]"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="7"
                placeholder="Enter your message here"
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-white shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Message.
                </span>
              )}
            </div>

            {/* submit btn */}
            <div className="w-full">
              <Button
                type="submit"
                onClick={handleSubmit(submitContactForm)}
                className={`rounded-md bg-yellow-50 px-6 py-3 lg:w-full text-center text-[13px] font-bold text-black w-full shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
                btnText="Send Message"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
