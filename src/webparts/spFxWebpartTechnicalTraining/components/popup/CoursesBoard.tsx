import * as React from "react";
import SingleCourse from "./SingleCourse";
import VlpHeader from "./VlpHeader";
import { forwardRef } from 'react';
import CourseBoard from "./CourseBoard";
import { Course } from "../ISpFxWebpartTechnicalTrainingProps";
import { trainingObject } from "../ISpFxWebpartTechnicalTrainingProps";

interface CourseBoardProps {
    Courses: Course[];
    handleTrainingDataClick: (trainingObject: trainingObject) => void;
    selectedTraining?: trainingObject;
}

const CoursesBoard = forwardRef<HTMLDivElement, CourseBoardProps>(({ Courses, handleTrainingDataClick, selectedTraining }, ref) => {

  // Extract VLP data
  const VLP_PercentageComplete =  selectedTraining?.PercentageComplete;
  const VLP_NAME = selectedTraining?.litmosLearningPathName;
  
  const litmosLearningPathUrl = selectedTraining?.litmosLearningPathUrl;
  
  
  return (
    <div ref={ref} className="h-auto  w-full py-10 flex items-center justify-center">
      <div className="mx-auto max-h-[500px] overflow-y-auto w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10" onClick={(e) => e.stopPropagation()}>
        <div className="max-h-full overflow-y-auto px-5">
          {/* If there's only one course, render the SingleCourse component */}
          {Courses?.length === 1 ? (
            <SingleCourse courseData={Courses[0]} litmosLearningPathUrl={litmosLearningPathUrl} />
          ) : (
            <div>
           {/* if there is more than one course render the VlpHeader component and render a Popup for each course*/}
              <VlpHeader
                title={VLP_NAME || ""}
                coursePercentageComplete={VLP_PercentageComplete ?? 0}
              />
              {Courses?.map((e: Course, i: number) => {
                return <CourseBoard key={i} courseData={e}/>;
                
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CoursesBoard;
