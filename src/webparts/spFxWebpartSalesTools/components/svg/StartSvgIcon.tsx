import * as React from "react";

const StartSvgIcon: React.FC = () => {

  return (
    <div className="flex  space-x-2">
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8.5C17 13.1944 13.1944 17 8.5 17C3.80558 17 0 13.1944 0 8.5C0 3.80558 3.80558 0 8.5 0C13.1944 0 17 3.80558 17 8.5Z" fill="#CCCCCC"/>
<path d="M16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16V17C3.80558 17 0 13.1944 0 8.5C0 3.80558 3.80558 0 8.5 0C13.1944 0 17 3.80558 17 8.5C17 13.1944 13.1944 17 8.5 17V16C12.6421 16 16 12.6421 16 8.5Z" fill="black"/>
<path d="M12.7166 6.45419L11.1068 7.50051C11.0452 7.54049 11.0068 7.61781 11.0068 7.70181V10.0253C11.0068 10.1094 11.0452 10.1867 11.1068 10.2266L12.7166 11.273C12.8439 11.3557 12.9989 11.2451 12.9989 11.0717V6.65567C12.9989 6.48202 12.8441 6.37159 12.7166 6.45437V6.45419Z" stroke="black" stroke-width="0.5" stroke-miterlimit="10"/>
<rect x="4.25" y="6.25" width="6.04536" height="5.22719" rx="0.75" stroke="black" stroke-width="0.5"/>
</svg>


      {/* Text next to the icon */}
      <span className="w-24 h-5  text-zinc-950 text-[10px] font-normal font-Poppins">Not Started</span>
    </div>
  );
};


export default StartSvgIcon;
