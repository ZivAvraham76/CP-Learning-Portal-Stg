// import { AadHttpClient } from '@microsoft/sp-http';

export interface Module {
  Name: string,
  Score: number,
  Completed: boolean,
  StartDate: string | undefined,
  accessUrl: string,
}

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
  coursePercentageComplete: number;
  Code: string;
  isOptional: boolean;
  Description: string;
  Modules: Module[];
}


export interface ISpFxWebpartOnboardingProps {
  description: string;
  onboardingId: string;
}

