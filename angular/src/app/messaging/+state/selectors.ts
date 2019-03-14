import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagingState } from './contract';
import * as compareAsc from 'date-fns/compare_asc';


const getMessagingState = createFeatureSelector<MessagingState>('messaging');

export const getMessages = createSelector(
  getMessagingState,
  state => state.messages.sort((first, second) => compareAsc(first.timestamp, second.timestamp))
);
