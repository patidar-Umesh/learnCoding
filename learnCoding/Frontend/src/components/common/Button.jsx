import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  btnText,
  type,
  // disabled,
  className,
  children,
  linkTo,
  onClick,
  ...props
}) => {
  return (
    <Link to={linkTo}>
      <button
        type={type}
        // disabled={disabled}
        onClick={onClick}
        className={` text-center text-[16px] px-6 py-3 bg-richblack-200 rounded-md font-bold
        hover:scale-95 transition-all text-black duration-200 ${className}
        `}
        {...props}
      >
        {btnText} {children}
      </button>
    </Link>
  );
};

export default Button;
