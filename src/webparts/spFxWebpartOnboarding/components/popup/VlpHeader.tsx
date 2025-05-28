import * as React from "react";
import VlpTitle from "./VlpTitle";
import VlpProgress from "./VlpProgress";

interface VlpHeaderProps{
    title: string,
    coursePercentageComplete: number;
}

const VlpHeader: React.FC<VlpHeaderProps> = ({ title, coursePercentageComplete }) => {

  return (
    
    <div className="flex w-full items-center justify-between py-2 mb-8">
      <VlpTitle title={title} />
      <VlpProgress coursePercentageComplete={coursePercentageComplete} />
    </div>
  );
};

export default VlpHeader;
