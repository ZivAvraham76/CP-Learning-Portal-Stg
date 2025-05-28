import * as React from "react";
import '../../../../assets/dist/tailwind.css';
import ModuleComplition from "./ModuleComplition";
import { Course } from './ISpFxWebpartSalesToolsProps';

interface CardBodyProps {
    course: Course;
}

const CardBody: React.FC<CardBodyProps> = ({ course }) => {
    return (
        <div className="p-4 flex flex-col justify-between h-[116px] relative">
            {/* Main Section: litmos Learning Path Name */}
            <div className="relative group">
                <h2 className="text-md font-Poppins font-semibold text-[#41273c] line-clamp-2">
                    {course.Name}
                </h2>
                <div className="absolute bottom-full mb-2 hidden w-auto max-w-xs bg-gray-800 text-white text-sm px-4 py-2 rounded-lg group-hover:block z-50 shadow-lg">
                    {course.Name}
                </div>
            </div>

            {/* Footer Section: Video Button & Progress */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between w-full">

                {/* Video Button */}
                <div className="w-[106px] h-[22px] px-2 py-0.5 bg-[#ee0c5d] rounded-xl flex justify-center items-center">
                    <button
                        className="text-white text-xs font-normal"
                    >
                        Video
                    </button>

                </div>
                <div className="w-8 h-8 flex justify-center items-center mr-6">
                    <ModuleComplition moduleCompleted={course.completed}
                        moduleStartDate={course.StartDate ?? undefined} />
                </div>
            </div>
        </div>
    );
};

export default CardBody;