import React from "react";
import Madam from "../../../assets-2/Images/Instructor.png";
import {HighlightTexts} from "./HighlightText";
import {CTAButton} from "../HomePage/CTAButton";
import { FaArrowRight } from "react-icons/fa";

export const InstructorSection = () => {
  return (
    <div className="mt-16 ">
      <div className="flex lg:flex-row gap-20 items-center">
        <div className="lg:w-[50%]">
          <img
            src={Madam}
            alt=""
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>

        <div className="lg:w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semobold lg:w-[50%]">
            Become an
            <HighlightTexts text={"Instructor"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};
