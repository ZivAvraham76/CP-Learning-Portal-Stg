import * as React from "react";
import SingleCourse from "./SingleCourse";
import { forwardRef } from 'react';
import { Course } from "../ISpFxWebpartOnboardingProps";
import VlpHeader from "./VlpHeader";
import CourseBoard from "./CourseBoard";
 
interface CourseBoardProps {
  modules: any[];
  selectedTraining?: any;
  hasEmptyCode?: boolean;
}

const CoursesBoard = forwardRef<HTMLDivElement, CourseBoardProps>(({ modules, selectedTraining, hasEmptyCode }, ref) => {

  // Filter modules by course 
  const filteredModulesByCourse = modules?.filter(
    (item: Course) => item.course === selectedTraining
  );

  // Group modules by course according to the selected training
  const groupedModulesByCourse = modules
    .filter((module: Course) => module.Code === selectedTraining)
    .reduce((acc: { [course: string]: Course[] }, module: Course) => {
      if (!acc[module.course]) {
        acc[module.course] = [];
      }
      acc[module.course].push(module);
      return acc;
    }, {});

  //Extract url from selected training
  const litmosLearningPathUrl = selectedTraining.accessUrl;

  return (
    <div ref={ref} className="h-screen w-full py-10 flex items-center justify-center">
      <div className="mx-auto h-full w-9/12 rounded-3xl border-4 border-[#f0f2f4] bg-white px-10 py-10" onClick={(e) => e.stopPropagation()}>
        <div className="max-h-full overflow-y-auto px-5">
          {/*  If hasEmptyCode is true (the regular onboarding) - each line is a single course, render the SingleCourse component */}
          {hasEmptyCode ? (
            <SingleCourse modules={filteredModulesByCourse} litmosLearningPathUrl={litmosLearningPathUrl} />
          ) : (
            // else (the special onboarding) - if there's only one course, render the SingleCourse component
            Object.keys(groupedModulesByCourse).length === 1 ? (
              <SingleCourse
                modules={Object.values(groupedModulesByCourse)[0]}
                litmosLearningPathUrl={litmosLearningPathUrl}
              />
            ) : (
              // else (the special onboarding) - if there's more than one course, render the VlpHeader and CourseBoard for each course
              <div>
                <VlpHeader
                  title={selectedTraining || ""}

                  // need to add calculate!!
                  coursePercentageComplete={0}
                />
                {Object.entries(groupedModulesByCourse).map(([courseName, modules], i) => {
                  return <CourseBoard key={i} courseData={{ courseName, modules }} />;
                })}
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );

});
 
export default CoursesBoard;
 
 