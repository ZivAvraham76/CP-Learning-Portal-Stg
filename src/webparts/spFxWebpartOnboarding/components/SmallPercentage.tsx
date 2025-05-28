import '../../../../assets/dist/tailwind.css';
import * as React from "react";

interface SmallPercentageProps {
    PercentageComplete: number;
}

const SmallPercentage: React.FC<SmallPercentageProps> = ({ PercentageComplete }) => {
    const radius = 11.5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (PercentageComplete / 100) * circumference;
    return (
        <div className="relative w-[23px] h-[23px] flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="-1 -1 25 25" xmlns="http://www.w3.org/2000/svg">
                {/* Background Circle */}
                <circle cx="11.5" cy="11.5" r={radius} fill="none" className="stroke-current text-zinc-300" strokeWidth="2"/>
                {/* Foreground Circle */}
                <circle
                    cx="11.5"
                    cy="11.5"
                    r={radius}
                    fill="none"
                    className="stroke-current text-[#41273c]"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            {/* Progress Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center text-[6px] font-Inter font-bold  text-stone-700">
                {PercentageComplete}%
            </div>
        </div>
    );
};

export default SmallPercentage;