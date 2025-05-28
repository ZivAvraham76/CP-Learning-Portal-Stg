import * as React from "react";
// import { useContext } from "react";
import ModuleComplition from "./ModuleComplition";
import ModuleTitle from "./ModuleTitle";
import ModuleScore from "./ModuleScore";
import { Module } from "../ISpFxWebpartOnboardingProps";

interface ModuleRowProps{
    module: Module;
}

const ModuleRow: React.FC<ModuleRowProps> = ({ module }) => {


  return (
    <div
      className="flex items-center justify-between border-b border-b-[#f0f2f4] py-3 hover:cursor-pointer hover:bg-[#fbfcfd]"
      onClick={() => {
        // When the row is clicked, open the LMS module URL in a new tab
        window.open(module.accessUrl
          , "_blank", "noopener, noreferrer");
      }}
    >
      <div className="flex items-center">
        <div className="mr-5">
          {/* Display the module completion status */}
          <ModuleComplition
            moduleCompleted={module.Completed}
            moduleStartDate={module.StartDate ?? undefined}
          />
        </div>
         {/* Display the module title */}
        <ModuleTitle moduleName={module.Name} />
      </div>
      <div className="">
        {/* Display the module score */}
        <ModuleScore
          moduleScore={module.Score}
          moduleCompleted={module.Completed}
        />
      </div>
    </div>
  );
};

export default ModuleRow;
