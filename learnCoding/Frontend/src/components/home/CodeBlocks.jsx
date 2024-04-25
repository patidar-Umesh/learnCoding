import React from "react";
import Button from "../common/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  btn1,
  btn2,
  codeblock,
  backgroudGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/*Section 1*/}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold ">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <Button
            className="bg-yellow-50 flex justify-center items-center text-black"
            linkto={btn1.linkto}
            btnText={btn1.btnText}
          >
              <FaArrowRight className="mx-2" />
          </Button>

          <Button
            className="bg-richblack-200 text-black"
            linkto={btn2.linkto}
            btnText={btn2.btnText}
          />
        </div>
      </div>

      {/*Section 2*/}
      <div className=" h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px]">

        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
