import * as React from "react";
import ArrowUpRightFromSquare from "./svg/ArrowUpRightFromSquare";
// import OptionalLabel from "./OptionalLabel";
import { CaretRight } from "@phosphor-icons/react";

interface CourseTitleProps {
  title?: string;
  litmosLearningPathUrl?: string;
  isVisible: boolean;
  isOptional?: boolean;
  
}

const CourseTitle: React.FC<CourseTitleProps> = ({ title,
  litmosLearningPathUrl,
  isVisible,
  isOptional
}) => {

  const style = isVisible
    ? "transition-all duration-300 rotate-90"
    : "transition-all duration-300";

  return (
    <div className="tablet:w-9/12 flex items-center py-2">
      {/* Render the arrow icon, which rotates when the course details are visible */}
      <div className={`${style} `}>
        <CaretRight color="#607d8a" size={16} />
      </div>

      {/* Render the course title */}
      <div className="mx-4">
        <h1 className="tablet:text-sm widescreen:text-lg text-left font-Poppins font-bold text-[#797b7b]">
          {title}
        </h1>
      </div>

      {/* If the LMS course URL exists, display the ArrowUpRightFromSquare component */}
      {litmosLearningPathUrl && (
        <div className="">
          <ArrowUpRightFromSquare litmosLearningPathUrl={litmosLearningPathUrl} size={5} />
        </div>
      )}

      {/* If the course is optional, display the OptionalLabel component */}
      {/* {isOptional && <OptionalLabel data={data} />} */}
    </div>
  );
};

export default CourseTitle;
