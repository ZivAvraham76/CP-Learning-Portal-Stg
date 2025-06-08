// import { AadHttpClient } from '@microsoft/sp-http';

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
  coursePercentageComplete: number,
  courseComplete: boolean,
}

interface LearningPath {
  Name: string;
  PercentageComplete: number;
}


export interface OnboardingData {
  modules: Module[];
  learningPath: LearningPath;
}

export interface Item{
  Email: string;
  field_3: string;
  OnboardingId: string;
  field_18: string;
}

export interface CourseRow {
  course?: string;
  Code?: string;
  coursePercentageComplete: number;
}


export interface ISpFxWebpartOnboardingProps {
  description: string;
  onboardingId: string;
}

