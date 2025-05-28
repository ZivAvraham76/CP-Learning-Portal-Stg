import * as React from "react";
import CourseDescription from "./CourseDescription";
import ArrowUpRightFromSquare from "./svg/ArrowUpRightFromSquare";
import ModulesTable from "./ModulesTable"
import VlpTitle from "./VlpTitle";
import VlpProgress from "./VlpProgress";
import { Course } from "../ISpFxWebpartTechnicalTrainingProps";

interface SingleCourseProps {
  courseData: Course;
  litmosLearningPathUrl?: string;
}


const SingleCourse: React.FC<SingleCourseProps> = ({ courseData, litmosLearningPathUrl }) => {
  return (
    <div className="h-full w-full">
      {/* Header section containing course title and progress */}
      <div
        id="headerContainer"
        className="mb-8 flex w-full items-center justify-between py-2"
      >
        {/* Course title section */}
        <div className="tablet:w-6/12 flex items-center">
          <VlpTitle title={courseData.Name} />
          {litmosLearningPathUrl && (
            <div className="ml-2.5">
              {/* Display an arrow link if LmsCourseUrl is provided */}
              <ArrowUpRightFromSquare
                litmosLearningPathUrl={litmosLearningPathUrl}
                size={5}
              />
            </div>
          )}
        </div>

        {/* Course progress section */}
        <VlpProgress coursePercentageComplete={courseData.PercentageComplete} />
      </div>

      {/* Description and Modules Table section */}
      <div className="">
        <div id="courseDiscriptionContainer" className="">
          {/* Display the course description */}
          <CourseDescription courseDescription={courseData.Description} />
        </div>
        <div id="moduleTableContainer" className="">
          {/* Display the modules of the course in a table */}
          <ModulesTable modules={courseData.Modules} />
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
