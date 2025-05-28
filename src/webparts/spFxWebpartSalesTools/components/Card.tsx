import '../../../../assets/dist/tailwind.css';
import * as React from "react";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import { Course } from './ISpFxWebpartSalesToolsProps';

interface CardProps {
  course: Course;
}

const Card: React.FC<CardProps> = ({ course }) => {
  return (
    <div className="h-[247px] w-[225px] rounded-xl border-[1px]  border-stone-300 flex flex-col overflow-hidden hover:bg-gray-100 cursor-pointer"
    onClick={() => window.open(course.accessUrl, `_blank`)}>
      <CardHeader course={course}/>
      <CardBody course={course} />
    </div>
  );
};

export default Card;