import * as React from "react";
import ProgressBar from "./ProgressBar";

interface VlpProgressProps{
    coursePercentageComplete: number;
}

const VlpProgress: React.FC<VlpProgressProps> = ({ coursePercentageComplete }) => {

  return (
    <div className="tablet:w-4/12 widescreen:w-3/12 flex items-center justify-between">
      <div className="mr-2.5 w-5/12">
        <h1 className="text-right font-TitanOne text-4xl font-normal text-[#607d8a]">
          {coursePercentageComplete}%
        </h1>
      </div>
      <div className="w-7/12">
        <ProgressBar coursePercentageComplete={coursePercentageComplete} />
      </div>
    </div>
  );
};

export default VlpProgress;
