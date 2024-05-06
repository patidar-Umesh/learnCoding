import React from 'react'
import Instructor from "../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from "../common/Button"
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16 w-[100%]'>
      <div className='flex  flex-col sm:flex-row gap-5 sm:gap-20 items-center'>

        <div className='w-[50%]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-white'
            />
        </div>

        <div className='w-[100%] bg-[] sm:w-[50%] sm:text-left flex text-center flex-col gap-2 sm:gap-10'>
            <div className='text-[2rem]  sm:text-4xl font-semobold w-[100%] sm:w-[50%]'>
                Become an <HighlightText text={"Instructor"} />
                
            </div> 

            <p className='font-medium text-[16px] w-[100%]  sm:w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on LearnCoding. We provide the tools and skills to teach what you love.
            </p>

            <div className='sm:w-fit grid place-content-center w-[100%]'>
               <Link to='/signup'>
               <Button  className='bg-yellow-50 w-[100%] flex justify-center items-center' btnText='Start Learning Today'>
                        <FaArrowRight className='mx-2'/>
                </Button>
               </Link>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
