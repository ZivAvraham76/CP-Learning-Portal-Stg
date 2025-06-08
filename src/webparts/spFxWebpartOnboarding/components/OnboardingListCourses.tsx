import * as React from 'react';
import '../../../../assets/dist/tailwind.css';
import CourseLine from './CourseLine';
import { CourseRow} from './ISpFxWebpartOnboardingProps';


export interface Course {
    id: string;
    adsm: string;
    name: string;
    role: string;
    originalid: number;
    levelName: string;
    completed: boolean;
    course: string;
    cid: string;
    coriginalid: number;
    accessUrl: string;
  }

interface OnboardingListCoursesProps {
    uniqueCourses: CourseRow[];
    handleTrainingDataClick: (trainingObject: string) => void;
}

const OnboardingListCourses: React.FC<OnboardingListCoursesProps> = ({uniqueCourses,handleTrainingDataClick}) => {
    return (
        <div className="space-y-2 max-h-28 overflow-y-auto pr-2 w-[445px] group z-30 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            {/* List of unique rows (by code or course) */}
            {uniqueCourses?.map((module, index) => (
                <CourseLine
                    key={index}
                    module={module}
                    handleTrainingDataClick={(trainingObject: string) => handleTrainingDataClick(trainingObject)}
                />        
            ))}
        </div>
    );
}
export default OnboardingListCourses;
