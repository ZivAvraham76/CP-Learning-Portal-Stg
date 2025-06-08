
export interface Module {
  id: string;
  adsm: string;
  Name: string;
  role: string;
  originalId: number;
  levelName: string;
  completed: boolean;
  course: string;
  cid: string;
  coriginalid: number;
  accessUrl: string;
  CourseImageURL: string;
  StartDate: string;
  Score: number;
  courseDescription: string,
  courseId: string,
  Code: string,
  isOptional: boolean,
  coursePercentageComplete: string,
  courseComplete: boolean,
}

interface LearningPath {
  Name: string;
  PercentageComplete: number;
}


export interface SalesToolsData {
  modules: Module[];
  learningPath: LearningPath;
}


export interface ISpFxWebpartSalesToolsProps {
  description: string;
  lp_id: string;
}
