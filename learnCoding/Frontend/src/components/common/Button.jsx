import React from 'react'
import {Link} from "react-router-dom"

const Button = ({btnText, active, type, className, disabled, linkTo, ...props}) => {
  return (

       <Link to={linkTo}>
        
        <button className={` ${className} text-center text-[16px] px-6 py-3 rounded-md font-bold
        ${active ? "bg-yellow-50 text-black":" bg-richblack-800"} 
        hover:scale-95 transition-all duration-200
        `}{...props} type={type} disabled={disabled}  >
            {btnText}
        </button>

        </Link>

  )
}

export default Button
