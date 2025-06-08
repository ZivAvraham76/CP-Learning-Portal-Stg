export interface Item {
  Title: string;
  Link: string;
}

export interface ListData {
  value: Item[];
}

export interface ISpFxWebpartNavbarProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  servicesList: Item[];
  categoriesList: Item[];
}

export interface Badge { Title: string; Icon: string, EarnedPoint: string  }
