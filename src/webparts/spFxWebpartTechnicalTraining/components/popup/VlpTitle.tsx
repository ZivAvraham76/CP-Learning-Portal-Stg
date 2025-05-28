import * as React from "react";

interface VlpTitleProps{
    title: string;
}

const VlpTitle: React.FC<VlpTitleProps> = ({ title }) => {

  return (
    <div className="">
      <h1 className="widescreen:text-3xl laptop:text-xl tablet:text-lg text-left font-Poppins font-bold text-[#607d8a]">
        {title}
      </h1>
    </div>
  );
};

export default VlpTitle;
