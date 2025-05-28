import * as React from "react";
import { useState } from 'react';
import Header from "./Header";
import CourseDescription from "./CourseDescription";
import ModulesTable from "./ModulesTable";
// import { Course } from "../ISpFxWebpartOnboardingProps";



interface CourseBoardProps {
  courseData: any;

}

const CourseBoard: React.FC<CourseBoardProps> = ({ courseData }) => {

  // State to manage whether the course details are visible or not
  const [isVisible, SetIsVisible] = useState(false);

  // Function to toggle the visibility of the course details
  const togglCourseDetails = (): void => {
    SetIsVisible(!isVisible);
  };

  return (
    <div className="h-full w-full">
      <div
        id="headerContainer"
        className="hover:cursor-pointer"
        onClick={() => togglCourseDetails()} // Toggle the details visibility when clicked
      >
        {/* Render the header component */}
        <Header
          isVisible={isVisible}
          title={courseData.modules[0].course}
          coursePercentageComplete={courseData.modules[0].coursePercentageComplete}
          litmosLearningPathUrl={courseData.modules[0].accessUrl}
          isOptional={courseData.modules[0].isOptional}

        />
      </div>

      {/* Conditionally render the course details when `isVisible` is true */}
      {isVisible && (
        <div className="">
          <div id="courseDiscriptionContainer" className="">
            <CourseDescription courseDescription={courseData.modules[0].Description} />
          </div>
          <div id="moduleTableContainer" className="">
            <ModulesTable modules={courseData.modules} />
          </div>

        </div>
      )}

    </div>
  );
};

export default CourseBoard;
