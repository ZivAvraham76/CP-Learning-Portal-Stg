
export interface Course {
  id: string;
  adsm: string;
  Name: string;
  role: string;
  originalid: number;
  levelName: string;
  completed: boolean;
  course: string;
  cid: string;
  coriginalid: number;
  accessUrl: string;
  CourseImageURL: string;
  StartDate: string;
}

export interface ISpFxWebpartSalesToolsProps {
  description: string;
  lp_id: string;
}
