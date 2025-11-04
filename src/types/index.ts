export type RootStackParamList = {
  Home: undefined;
  SixWeekCourses: undefined;
  SixMonthCourses: undefined;
  Calculator: undefined;
};

export interface Course {
  title: string;
  description: string;
  duration: string;
  fee: string;
}