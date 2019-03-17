import { NavigationElement } from '../models/navigation-element';
import { NavigationElementType } from '../models/navigation-element-type';

export interface NavigationState {
  elements: NavigationElement[];
  selectedElementType: NavigationElementType;
}

export const initialState: NavigationState = {
  elements: [],
  selectedElementType: null,
};
