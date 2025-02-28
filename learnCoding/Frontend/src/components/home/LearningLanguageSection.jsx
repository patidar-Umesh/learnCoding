import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../assets//Images/Know_your_progress.png";
import compare_with_others from "../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../assets/Images/Plan_your_lessons.png";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const LearningLanguageSection = () => {
  return (
    <div className="sm:mt-[130px] sm:mb-32">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-row items-center justify-center mt-5">
          {/* left img */}
          <img
            src={know_your_progress}
            alt="KNowYourProgressImage"
            className="object-contain -mr-32 "
          />

          {/* center img */}
          <img
            src={compare_with_others}
            alt="KNowYourProgressImage"
            className="object-contain"
          />

          {/* right img */}
          <img
            src={plan_your_lesson}
            alt="KNowYourProgressImage"
            className="object-contain -ml-36"
          />
        </div>

        <div className="w-fit">
          <Link to="/signup">
            <Button btnText="Learn more" className="bg-yellow-50" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
