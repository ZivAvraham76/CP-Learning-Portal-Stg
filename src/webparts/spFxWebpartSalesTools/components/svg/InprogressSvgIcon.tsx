import * as React from "react";

const InprogressSvgIcon: React.FC = () => {

  return (
    <div className="  flex  space-x-2">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8.82874" r="8" fill="#6FA8D1" stroke="black" />
        <path d="M13.7166 6.45419L12.1068 7.50051C12.0452 7.54049 12.0068 7.61781 12.0068 7.70181V10.0253C12.0068 10.1094 12.0452 10.1867 12.1068 10.2266L13.7166 11.273C13.8439 11.3557 13.9989 11.2451 13.9989 11.0717V6.65567C13.9989 6.48202 13.8441 6.37159 13.7166 6.45437V6.45419Z" stroke="black" stroke-width="0.5" stroke-miterlimit="10" />
        <rect x="5.25" y="6.25" width="6.04536" height="5.22719" rx="0.75" stroke="black" stroke-width="0.5" />
      </svg>

      {/* Text next to the icon */}
      <span className="w-24 h-5  text-zinc-950 text-[10px] font-normal font-Poppins">In Progress</span>
    </div>
  );
};


export default InprogressSvgIcon;
