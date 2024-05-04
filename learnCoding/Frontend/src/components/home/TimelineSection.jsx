import React from 'react'
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];

const TimelineSection = () => {
  return (
    <div>
      <div className='flex w-[100%] flex-col sm:flex-row justify-between items-center'>

{/* left section */}
        <div className='w-[100%] sm:w-[45%]  flex flex-col gap-5'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-col flex-wrap sm:flex-row sm:gap-6' key={index}>

                            <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                <img src={element.Logo} alt=''/>
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>

                        </div>
                    )
                } )
            }
        </div>

        {/* right section */}
        <div className='w-full relative mt-[120px] sm:mt-0 flex items-center justify-center flex-col shadow-blue-200'>
          <div className='hidden  sm:block'>
          <img  src={timelineImage}
            alt="timelineImage"
            className='shadow-white  object-cover h-fit'
            />
          </div>

            <div className='absolute bg-caribbeangreen-700 mb-5 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                <div className='flex gap-5 items-center px-7'>
                <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>TYpe of Courses</p>
                </div>

            </div>
        </div>

      </div>
    </div>
  )
}

export default TimelineSection
