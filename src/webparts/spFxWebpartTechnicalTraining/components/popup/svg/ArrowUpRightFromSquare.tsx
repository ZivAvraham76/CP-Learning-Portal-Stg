import * as React from "react";

interface ArrowUpRightFromSquareProps {
  litmosLearningPathUrl?: string;
  size: number,
}

const ArrowUpRightFromSquare: React.FC<ArrowUpRightFromSquareProps> = ({litmosLearningPathUrl, size}) => {

  return (
    <div
      className={`widescreen:h-5 widescreen:w-5 tablet:h-3 tablet:w-3 text-[#607d8a] hover:cursor-pointer`}
      onClick={() => {
        window.open(litmosLearningPathUrl, "_blank", "noopener, noreferrer");
      }}
    >
      <svg className="fill-current" viewBox="0 0 512 512">
        <path d="M304 24c0 13.3 10.7 24 24 24H430.1L207 271c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l223-223V184c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24H328c-13.3 0-24 10.7-24 24zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V440c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z" />
      </svg>
    </div>
  );
};


export default ArrowUpRightFromSquare;
