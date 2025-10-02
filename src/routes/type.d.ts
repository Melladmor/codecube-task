export interface RoutesI {
  id: number;
  path: string;
  title: string;
  element: React.ComponentType<any>;
  isPublic?: boolean;
  children?: RoutesI[];
}
