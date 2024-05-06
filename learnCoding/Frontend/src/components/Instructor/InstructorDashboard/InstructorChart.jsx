import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses?.map((course)=> course.courseName),
        datasets: [
            {
                data: courses?.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses?.map((course)=> course.courseName),
        datasets: [
            {
                data: courses?.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }


    //create options
    const options = {

    };


  return (
    <>
      <p>Summary</p>

      <div className='flex  gap-x-5'>
        <button 
        onClick={() => setCurrChart("students")}
         type="button" className="text-white bg-[#e99e18] focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Student
            </button>
        <button className='class="text-white bg-[#e99e18] focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"'
        onClick={() => setCurrChart("income")}
        >
            Income
        </button>
      </div>
    <div className='bg-[#4c4949]  p-10 flex justify-center items-center'>
      <div className='h-[300px]  w-[300px]'>
        <Pie 
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
    </>
  )
}

export default InstructorChart
