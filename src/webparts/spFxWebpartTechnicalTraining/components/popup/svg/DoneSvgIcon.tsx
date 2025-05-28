import * as React from "react";

const DoneSvgIcon: React.FC = () => {

  return (
    <div className="h-5 w-5 text-green-500">
      <svg className="" viewBox="0 0 28.85 28.85">
        <g id="Layer_1-2">
          <circle
            className="fill-[#EE0C5D] stroke-0"
            cx="14.42"
            cy="14.42"
            r="14.42"
          />
          <rect
            className="fill-white"
            x="7.23"
            y="14.55"
            width="7.7"
            height="2.78"
            transform="translate(14.52 -3.17) rotate(45)"
          />
          <rect
            className="fill-white"
            x="11.38"
            y="12.47"
            width="10.67"
            height="2.78"
            transform="translate(-4.9 15.88) rotate(-45)"
          />
        </g>
      </svg>
    </div>
  );
};


export default DoneSvgIcon;
