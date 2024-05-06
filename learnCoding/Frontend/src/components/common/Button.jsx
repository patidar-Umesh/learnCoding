import React from "react";

const Button = ({
  btnText,
  type,
  disabled,
  className,
  children,
  onClick,
  ...props
}) => {
  return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={` text-center text-[16px] px-6 py-3 flex justify-center items-center bg-richblack-200 rounded-md font-bold
        hover:scale-95 transition-all text-black duration-200 ${className}
        `}
        {...props}
      >
        {btnText} {children}
      </button>
  );
};

export default Button;
