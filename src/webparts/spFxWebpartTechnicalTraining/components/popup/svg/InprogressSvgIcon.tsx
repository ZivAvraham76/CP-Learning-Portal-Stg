import * as React from "react";

const InprogressSvgIcon: React.FC = () => {

  return (
    <div className="h-5 w-5">
      <svg className="" viewBox="0 0 28.85 28.85">
        <g id="Layer_1-2">
          <circle className="fill-[#f0f2f4]" cx="14.42" cy="14.42" r="14.42" />
          <path
            className="fill-[#607d8a] opacity-25"
            d="m18.71,15.17l-4.92,4.92c-.67.67-1.8.19-1.8-.75v-9.83c0-.94,1.14-1.41,1.8-.75l4.92,4.92c.41.41.41,1.08,0,1.49Z"
          />
          <path
            className="fill-[#EE0C5D]"
            d="m14.42,28.85C6.46,28.85,0,22.39,0,14.42S6.46,0,14.42,0v28.85Z"
          />
        </g>
      </svg>
    </div>
  );
};


export default InprogressSvgIcon;
