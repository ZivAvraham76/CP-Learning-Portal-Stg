import '../../../../assets/dist/tailwind.css';
import * as React from "react";

interface ProgressBarProps {
    PercentageComplete: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ PercentageComplete }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (PercentageComplete / 100) * circumference;
    return (
        <div className="relative w-[86px] h-[86px] flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                {/* Background Circle */}
                <circle cx="18" cy="18" r={radius} fill="none" className="stroke-current text-[#DADADB]" strokeWidth="1.5"/>
                {/* Foreground Circle */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    className="stroke-current text-[#EE0C5D]"
                    strokeWidth="1.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            {/* Progress Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold font-Poppins text-[#3E2639]">
                {PercentageComplete}%
            </div>
        </div>
    );
};

export default ProgressBar;