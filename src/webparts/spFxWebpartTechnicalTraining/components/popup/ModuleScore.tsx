import * as React from "react";

interface ModuleScoreProps{
    moduleScore: number,
    moduleCompleted: boolean
}

const ModuleScore: React.FC<ModuleScoreProps> = ({ moduleScore, moduleCompleted }) => {

  return (
    <div className="">
      {moduleCompleted && moduleScore > 0 && (
        <p className="font-Poppins text-[#607d8a] text-sm font-semibold">
          MY SCORE: {moduleScore} %
        </p>
      )}
    </div>
  );
};

export default ModuleScore;
