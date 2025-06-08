import '../../../../assets/dist/tailwind.css';
import * as React from "react";

interface PercentageProps {
    PercentageComplete: number;
    isHovered?: boolean;

}

const Percentage: React.FC<PercentageProps> = ({ PercentageComplete, isHovered }) => {
    return (
        <div className="w-full ">
        {/* Progress Bar Container */}
        <div className={`relative  h-[6px] ${isHovered ? 'bg-gray-600' : 'bg-zinc-400'}`}>

            {/* Progress Fill */}
            <div 
                className="h-full bg-[#ee0c5d]  transition-all duration-300 ease-out"
                style={{ width: `${PercentageComplete}%` }}
            />
        </div>
        
     
    </div>
       
    );
};

export default Percentage;