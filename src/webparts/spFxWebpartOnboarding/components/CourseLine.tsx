import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import { Course } from "./ISpFxWebpartOnboardingProps";
import SmallPercentage from './SmallPercentage';
import Tooltip from './Tooltip';

interface CourseLineProps {
  course: Course;
  handleTrainingDataClick: (trainingObject: any) => void;
}

const CourseLine: React.FC<CourseLineProps> = ({ course, handleTrainingDataClick }) => {
  const Title = course.Code || course.course || '';
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top - 40,
      left: rect.left,
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
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
          <SmallPercentage PercentageComplete={course.coursePercentageComplete} />
        </div>
      </div>
    </div>
  );
};

export default CourseLine;
