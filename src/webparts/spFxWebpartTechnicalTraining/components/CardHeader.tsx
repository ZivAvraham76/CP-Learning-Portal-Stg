import * as React from "react";
import { trainingObject } from './ISpFxWebpartTechnicalTrainingProps';


interface CardHeaderProps {
    trainingObject: trainingObject;
}

const CardHeader: React.FC<CardHeaderProps> = ({ trainingObject }) => {
    const imageUrl = trainingObject.CourseImageURL ?? "https://picsum.photos/160";

    return (
        <div className="relative w-full h-[134px]">
            {/* Course Image */}
            <div className=" relative flex items-center justify-center h-full ">
                <img className="w-[213px] h-[121px] rounded-lg" src={imageUrl} alt="Course" />
            
            {/* Level Badge */}
            <div className="absolute top-2 left-0 w-28 h-5 flex items-center justify-center">
                <svg width="107" height="23" viewBox="0 0 107 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector 87" d="M106 1H1V22H106L100.653 12L106 1Z" fill="white" stroke="#F1F1F1" />
                </svg>

                <div className="absolute inset-0 flex items-center text-[12px] text-[#41273c] font-bold font-Poppins text-left px-2">
                    {trainingObject.levelName || 'Level'}
                </div>
            </div>
            </div>
        </div>
    );
};

export default CardHeader;