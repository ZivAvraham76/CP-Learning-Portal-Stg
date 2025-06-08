import * as React from "react";
import { Module } from "../ISpFxWebpartOnboardingProps";

interface OptionalLabelProps{
    data: {
        VLP_NAME: string;
        VLP_PercentageComplete: number;
        modules: Module[];
      };
}

const OptionalLabel: React.FC<OptionalLabelProps> = ({ data }) => {

  return (
    <div className="tablet:text-[10px] widescreen:text-xs ml-4 rounded-xl border-2 bg-[#607d8a] px-2 py-1 align-middle font-bold text-white">
      <h1>Optional</h1>
    </div>
  );
};

export default OptionalLabel;
