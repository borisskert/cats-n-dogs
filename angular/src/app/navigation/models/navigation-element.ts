import { NavigationElementType } from './navigation-element-type';

export interface NavigationElement {
  text: string;
  type: NavigationElementType;
  enabled: boolean;
  hidden: boolean;
  order: number;
}
