import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import { Module } from './ISpFxWebpartSalesToolsProps';

interface CardProps {
  module: Module;
}

const Card: React.FC<CardProps> = ({ module }) => {
 
  return (
    <div className="h-[247px] w-[225px] rounded-xl border-[1px]  border-stone-300 flex flex-col overflow-hidden cursor-pointer"
   
    onClick={() => window.open(module.accessUrl, `_blank`)}
    >
      <CardHeader module={module}/>
      <CardBody module={module} />
    </div>
  );
};

export default Card;