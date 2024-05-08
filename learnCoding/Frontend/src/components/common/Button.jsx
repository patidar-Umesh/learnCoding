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
        className={` text-center text-[12px] sm:text-[18px] sm:px-6 sm:py-4 flex justify-center items-center 
        bg-yellow-50 rounded-md font-bold py-1 px-3  gap-x-1
        hover:scale-95 cursor-pointer transition-all text-black duration-200 ${className}
        `}
        {...props}
      >
        {btnText} {children}
      </button>
  );
};

export default Button;
