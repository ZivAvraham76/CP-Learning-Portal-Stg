export interface ISpFxWebpartTechnicalTrainingProps {
  description: string;
  type: string;
  fetchListData: () => Promise<ListData | undefined>; 
}

export interface badgesPointsData {
  Description?: string;
  EarnedPoint?: number;
  Icon?: string;
  ItemName?: string;
  Title?: string;
}
export interface BaseDataItem {
  Id?: number;
  Title?: string | undefined;
  litmosLearningPathName?: string;
  litmosLearningPathUrl?: string | undefined;
  PercentageComplete?: string;
  levelName?: string;
  productName?: string;
  pillar?: string;
  ID?: number;
  AuthorId?: number;
  EditorId?: number;
}
export interface ListData {
  value: BaseDataItem[] ;
}
export interface trainingObject {
  litmosLearningPathName: string;
  pillar: string;
  productName: string;
  litmosLearningPathUrl: string;
  PercentageComplete: number;
  levelName: string;
  Id: string;
  CourseImageURL: string;
  type: string;
}

export interface Module {
  Name: string,
  Score: number,
  Completed: boolean,
  StartDate: string | undefined,
  accessUrl: string,
}
export interface Course {
  Name: string;
  Complete: boolean,
  PercentageComplete: number,
  litmosLearningPathUrl: string,
  Description: string,
  Modules: Module[],
  isOptional?: boolean,
}

export interface TrainingData {
  producttraining: trainingObject[];
  user: {
    userBadgesPointsData: badgesPointsData[];
  };
  lmsUserId: string;
}