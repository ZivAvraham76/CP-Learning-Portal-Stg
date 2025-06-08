import * as React from "react";
import '../../../../assets/dist/tailwind.css';
import { trainingObject } from "./ISpFxWebpartTechnicalTrainingProps";

interface CardBodyProps {
    trainingObject: trainingObject;
}

const CardBody: React.FC<CardBodyProps> = ({trainingObject }) => {
    return (
        <div className="p-4 flex flex-col justify-between relative h-[116px] text-[#41273c] overflow-visible">
            {/* Main Section: litmos Learning Path Name */}
            <div className="relative group">
                <h2 className="text-md font-Poppins font-semibold line-clamp-2">
                    {trainingObject.litmosLearningPathName}

                </h2>
                <div className="absolute bottom-full mb-2 hidden w-auto max-w-xs bg-gray-800 text-white text-sm px-4 py-2 rounded-lg group-hover:block z-50 shadow-lg">
                    {trainingObject.litmosLearningPathName}
                </div>
            </div>

            {/* Footer Section: Learning Path Button & Progress Ring */}
            <div className="bottom-2 flex items-center justify-between w-full">

                {/* Learning Path Button - Left */}
                <div className="text-xs font-bold font-['Poppins'] self-start">
    

                        {trainingObject.levelName}
            
                </div>

                {/* Progress Ring - Right */}
                {/* <div className="w-8 h-8 flex justify-center items-center mr-6">
                    <ProgressRing PercentageComplete={PercentageComplete} />
                </div> */}
            </div>
        </div>
    );
};
export default CardBody;