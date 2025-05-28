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
    <div className="">
    <div className="">
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
  </div>
  );
};

export default ModuleComplition;
