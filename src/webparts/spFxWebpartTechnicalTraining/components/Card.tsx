import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import { trainingObject } from './ISpFxWebpartTechnicalTrainingProps';
interface CardProps {
  trainingObject: trainingObject;
  handleTrainingDataClick: (trainingObject: trainingObject) => void;
}

const Card: React.FC<CardProps> = ({ trainingObject, handleTrainingDataClick }) => {
  const percentage = Math.max(0, Math.min(100, trainingObject.PercentageComplete));

  
  return (
    <div className="h-[247px] w-[225px] rounded-xl border-[1px] border-stone-300 flex flex-col   cursor-pointer"   onClick={() => handleTrainingDataClick(trainingObject)}>
      <CardHeader trainingObject={trainingObject}  PercentageComplete={percentage}/>
      <CardBody trainingObject={trainingObject} />
    </div>
  );
};

export default Card;
