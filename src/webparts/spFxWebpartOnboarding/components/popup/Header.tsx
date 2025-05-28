import * as React from "react";
import CourseTitle from "./CourseTitle";
import Progress from "./Progress";


// interface Module{
//     Name: string,
//     Score: number,
//     Completed: boolean,
//     StartDate: string | null,
//     LmsModuleUrl: string,
//   }
  
//   interface Course{
//     Name: string;
//     Complete: boolean,
//     PercentageComplete: number,
//     LmsCourseUrl: string,
//     Description:string,
//     Modules: Module[],
//     isOptional?: boolean,
//   }

interface HeaderProps {
  isVisible: boolean;
  title?: string;
  coursePercentageComplete?: number;
  litmosLearningPathUrl?: string;
  isOptional?: boolean;
  // data: {
  //   VLP_NAME: string;
  //   VLP_PercentageComplete: number;
  //   Courses: Course[];
  // };
}

const Header: React.FC<HeaderProps> = ({ isVisible,
    title,
    coursePercentageComplete,
    litmosLearningPathUrl,
    isOptional,
    }) => {

  return (
<div className="mb-1 flex w-full items-center justify-between rounded-xl bg-[#eff2f3] p-2">
      {/* Render the CourseTitle component */}
      <CourseTitle
        title={title}
        litmosLearningPathUrl={litmosLearningPathUrl}
        isVisible={isVisible}
        isOptional={isOptional ?? false}
       
      />
       {/* Render the Progress component */}
      <Progress coursePercentageComplete={coursePercentageComplete ?? 0} />
    </div>
  );
};

export default Header;
