import React from 'react'
import Instructor from "../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from "../common/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-row gap-20 items-center'>

        <div className='w-[50%]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-white'
            />
        </div>

        <div className='w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semobold w-[50%]'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on LearnCoding. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit'>
                <Button  linkto={"/signup"} className='bg-yellow-50 flex justify-center items-center' btnText='Start Learning Today'>
                        <FaArrowRight className='mx-2'/>
                </Button>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
