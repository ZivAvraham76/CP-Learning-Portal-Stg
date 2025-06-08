import * as React from "react";

const DoneSvgIcon: React.FC = () => {

  return (
    <div className=" flex  space-x-2">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 8.82874C17.5 13.5232 13.6944 17.3287 9 17.3287C4.30558 17.3287 0.5 13.5232 0.5 8.82874C0.5 4.13432 4.30558 0.328735 9 0.328735C13.6944 0.328735 17.5 4.13432 17.5 8.82874Z" fill="#6FD195" />
      </svg>

      {/* Text next to the icon */}
      <span className="w-24 h-5  text-zinc-950 text-[10px] font-normal font-Poppins">Completed</span>
    </div>
  );
};


export default DoneSvgIcon;
