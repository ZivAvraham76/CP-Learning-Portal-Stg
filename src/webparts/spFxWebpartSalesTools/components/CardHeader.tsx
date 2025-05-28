import * as React from "react";
import '../../../../assets/dist/tailwind.css';
import { Course } from "./ISpFxWebpartSalesToolsProps";

interface CardHeaderProps {
    course: Course;
}

const CardHeader: React.FC<CardHeaderProps> = ({ course }) => {
    const imageUrl = course.CourseImageURL ?? "https://picsum.photos/160";
    // Display the header text based on the selected filter
    return (
        <div className="relative w-full h-[134px]">
            <div className="flex items-center justify-center h-full">
            {/* Course Image */}
            <img className="h-[121px] w-[213px] rounded-lg" src={imageUrl} alt="Course" />
            </div>
            {/* Level Badge */}
            <div className="absolute top-2 left-0 w-[150px] h-[40px] flex items-center justify-center">
                <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M149 1H1V38H149L143.653 22L149 1Z" fill="white" stroke="#F1F1F1" />
                </svg>

                {/* Display the header text */}
                <div className="absolute inset-0 flex items-center text-[12px] text-[#41273c] font-bold font-Poppins text-left px-2">
                    {course.course}
                    
                </div>
            </div>
        </div>
    );
};

export default CardHeader;
