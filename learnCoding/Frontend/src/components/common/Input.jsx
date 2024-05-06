import React,{useRef} from "react";

const Input = function Input({
  label = "",
  type = "text",
  className = "",
  name = "",
  placeholder = "",
  astrick = false,
  required = false,
  id = "",
  error=  false,
  onChange ,
  register,
  ...props
}) 


{

  return (
    <div className={`w-full  `} >

      {label && (
        <label className="font-[500] text-white text-[.9rem] mb-1" htmlFor={id}>
          {label}
        {astrick &&   <sup className="text-pink-200 ml-2">*</sup>}
        </label>
      )}

      <input
        className={` rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 w-full  placeholder:text-richblack-400  focus:outline-none ${className} } `}
        // className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
        required={required}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        {...register}
        onChange={onChange}
        {...props}
      />

      {error &&
       <span className="ml-2 text-xs tracking-wide text-pink-200">
            {error}
          </span>}

    </div>
  );
};

export default Input;
