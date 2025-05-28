import * as React from "react";

interface CourseDescriptionProps{
    courseDescription: string;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ courseDescription }) => {

  return (
    <div className="py-2">
      <p className="font-Poppins text-[#607d8a] text-base font-normal leading-6">
        {courseDescription !== ""
          ? courseDescription
          : "Course description is not avaliable"}
      </p>
    </div>
  );
};

export default CourseDescription;
