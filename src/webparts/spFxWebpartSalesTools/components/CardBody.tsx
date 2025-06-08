import * as React from "react";
import '../../../../assets/dist/tailwind.css';
import ModuleComplition from "./ModuleComplition";
import { Module } from './ISpFxWebpartSalesToolsProps';

interface CardBodyProps {
    module: Module;
}

const CardBody: React.FC<CardBodyProps> = ({ module }) => {
    return (
        <div className="px-3 pt-3 pb-1 flex flex-col justify-start gap-2 h-[116px] relative text-[#41273c] overflow-visible">
            {/* Main Section: litmos Learning Path Name */}
            <div className="relative group h-[35px]">
                <h2 className="text-md font-Poppins font-semibold line-clamp-2 leading-tight">
                    {module.Name}
                </h2>
                <div className="absolute bottom-full mb-2 hidden w-auto max-w-xs bg-gray-800 text-white text-sm px-4 py-2 rounded-lg group-hover:block z-50 shadow-lg">
                    {module.Name}
                </div>
            </div>
            

            {/* Footer Section: Video Button & Progress */}
            <div className="flex flex-col items-start justify-end w-full">

                {/* Video Button */}
                <div className="text-xs font-medium font-['Poppins'] mb-2">

                        {module.course}

                </div>
                <div className="absolute bottom-0 left-6 w-24 h-6 flex justify-center items-center mt-1">
                    <ModuleComplition moduleCompleted={module.completed}
                        moduleStartDate={module.StartDate ?? undefined} />
                </div>
            </div>
        </div>
    );
};

export default CardBody;