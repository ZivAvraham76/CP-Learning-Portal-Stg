import * as React from "react";

interface ModuleTitleProps{
    moduleName: string;
}

const ModuleTitle: React.FC<ModuleTitleProps> = ({ moduleName }) => {

  return (
    <div className="">
      <p className="font-Poppins text-[#607d8a] text-base font-semibold">{moduleName}</p>
    </div>
  );
};

export default ModuleTitle;
