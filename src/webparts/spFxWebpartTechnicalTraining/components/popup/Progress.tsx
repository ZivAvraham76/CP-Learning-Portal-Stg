import * as React from "react";
import ProgressBar from "./ProgressBar";

interface ProgressProps {
  coursePercentageComplete: number;
}

const Progress: React.FC<ProgressProps> = ({ coursePercentageComplete }) => {
  return (
    <div className="tablet:w-3/12 widescreen:w-2/12 flex items-center justify-between">
      {/* Display the percentage of completion */}
      <div className="mr-2.5 w-4/12">
        <h1 className="text-right font-TitanOne text-xl font-normal text-[#607d8a]">
          {coursePercentageComplete}%
        </h1>
      </div>

       {/* Render the ProgressBar component with the course percentage */}
      <div className="mr-5 w-8/12">
        <ProgressBar coursePercentageComplete={coursePercentageComplete} />
      </div>
    </div>
  );


};

export default Progress;
