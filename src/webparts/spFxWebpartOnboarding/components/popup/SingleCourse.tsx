import * as React from "react";
import CourseDescription from "./CourseDescription";
// import ArrowUpRightFromSquare from "./svg/ArrowUpRightFromSquare";
import ModulesTable from "./ModulesTable"
import VlpTitle from "./VlpTitle";
import VlpProgress from "./VlpProgress";
// import { Course } from "../ISpfxOnboardingProps";

interface SingleCourseProps {
  modules: any;
  litmosLearningPathUrl?: string;
}


const SingleCourse: React.FC<SingleCourseProps> = ({ modules, litmosLearningPathUrl }) => {
  return (
    <div className="h-full w-full">
      {/* Header section containing course title and progress */}
      <div
        id="headerContainer"
        className="mb-8 flex w-full items-center justify-between py-2"
      >
        {/* Course title section */}
        <div className="tablet:w-6/12 flex items-center">
          <VlpTitle title={modules[0].course} />
          {/* {litmosLearningPathUrl && (
            <div className="ml-2.5"> */}
          {/* Display an arrow link if LmsCourseUrl is provided */}
          {/* <ArrowUpRightFromSquare
                litmosLearningPathUrl={litmosLearningPathUrl}
                size={5}
              /> */}
          {/* </div>
          )} */}
        </div>

        {/* Course progress section */}
        <VlpProgress coursePercentageComplete={modules[0].coursePercentageComplete} />
      </div>

      {/* Description and Modules Table section */}
      <div className="">
        <div id="courseDiscriptionContainer" className="">
          {/* Display the course description */}
          <CourseDescription courseDescription={modules[0].courseDescription
          } />
        </div>
        <div id="moduleTableContainer" className="">
          {/* Display the modules of the course in a table */}
          <ModulesTable modules={modules} />
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
