import * as React from "react";
import DoneSvgIcon from "./svg/DoneSvgIcon";
import InprogressSvgIcon from "./svg/InprogressSvgIcon";
import StartSvgIcon from "./svg/StartSvgIcon";

interface ModuleComplitionProps{
    moduleCompleted: boolean,
    moduleStartDate: string | undefined,
}

const ModuleComplition: React.FC<ModuleComplitionProps> = ({ moduleCompleted, moduleStartDate }) => {

  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      {moduleCompleted ? (
        // If the module is completed, render the DoneSvgIcon
        <DoneSvgIcon />
      ) : moduleStartDate ? (
        // If the module has started but not completed, render the InprogressSvgIcon
        <InprogressSvgIcon />
      ) : (
        // If the module has not started yet, render the StartSvgIcon
        <StartSvgIcon />
      )}
    </div>
  );
};

export default ModuleComplition;
