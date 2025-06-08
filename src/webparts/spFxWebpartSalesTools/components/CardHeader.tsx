import * as React from "react";
import '../../../../assets/dist/tailwind.css';
import { Module } from "./ISpFxWebpartSalesToolsProps";

interface CardHeaderProps {
    module: Module;
   
}

const CardHeader: React.FC<CardHeaderProps> = ({ module }) => {
    const imageUrl = module.CourseImageURL ?? "https://picsum.photos/160";
    const [isHovered, setIsHovered] = React.useState(false);
    // Display the header text based on the selected filter
    return (
        <div className="relative w-full h-[134px]">
            <div className="relative flex items-center justify-center h-full" onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {/* Course Image */}
                <img className="h-[121px] w-[213px] rounded-lg border border-stone-300" src={imageUrl} alt="Course" />

                {isHovered && (
                    <div className="w-[213px] h-[121px] absolute  bg-black/70 rounded-lg transition duration-300" />
                )}

                {isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_57673_6759)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M37 17.5C37 20.9612 35.915 24.3446 33.8822 27.2225C31.8494 30.1003 28.9601 32.3434 25.5797 33.6679C22.1992 34.9924 18.4795 35.339 14.8908 34.6637C11.3022 33.9885 8.0058 32.3218 5.41853 29.8744C2.83126 27.427 1.06931 24.3087 0.355481 20.9141C-0.358346 17.5194 0.0080157 14.0007 1.40824 10.803C2.80846 7.60533 5.17965 4.87221 8.22196 2.94928C11.2643 1.02636 14.8411 0 18.5 0C23.4065 0 28.1121 1.84374 31.5815 5.12563C35.0509 8.40752 37 12.8587 37 17.5ZM27.75 17.5L13.875 26.25V8.75L27.75 17.5Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_57673_6759">
                                    <rect width="37" height="35" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                )}


                {/* Level Badge */}
                {/* <div className="absolute top-2 left-0 w-[150px] h-[40px] flex items-center justify-center">
                <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M149 1H1V38H149L143.653 22L149 1Z" fill="white" stroke="#F1F1F1" />
                </svg> */}

                {/* Display the header text */}
                {/* <div className="absolute inset-0 flex items-center text-[12px] text-[#41273c] font-bold font-Poppins text-left px-2">
                    {module.course}
                    
                </div>
            </div> */}
            </div>
        </div>

    );
};

export default CardHeader;
