import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import SmallPercentage from './SmallPercentage';
import Tooltip from './Tooltip';
import { CourseRow } from './ISpFxWebpartOnboardingProps';

interface CourseLineProps {
  module: CourseRow;
  handleTrainingDataClick: (trainingObject: string) => void;
}

const CourseLine: React.FC<CourseLineProps> = ({ module, handleTrainingDataClick }) => {
  const Title = module.Code || module.course || '';
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) : void => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top - 40,
      left: rect.left,
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () : void => {
    setTooltipVisible(false);
  };
  return (
    <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <div
        className="w-full h-8 bg-neutral-100 rounded-lg flex items-center justify-between text-base font-medium font-Poppins text-stone-700 px-4 cursor-pointer"
        onClick={() => handleTrainingDataClick(Title)}
      >
        <div  >
          {/* Display the course/code icon */}
          <div className="overflow-visible whitespace-nowrap text-ellipsis max-w-[350px] font-Poppins">
            {/* Display the course/code title */}
            {Title.length > 30 ? `${Title.slice(0, 30)}...` : Title}
          </div>
          {/* Tooltip rendered using portal */}
          <Tooltip content={Title} position={tooltipPosition} visible={tooltipVisible} />
        </div>
        <div>
          {/* Display the progress */}
          <SmallPercentage PercentageComplete={module.coursePercentageComplete} />
        </div>
      </div>
    </div>
  );
};

export default CourseLine;
