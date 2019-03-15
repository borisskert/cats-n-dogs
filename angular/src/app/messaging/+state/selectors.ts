import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagingState } from './contract';
import * as compareAsc from 'date-fns/compare_asc';
import { Message } from '../models/message.interface';


const getMessagingState = createFeatureSelector<MessagingState>('messaging');

export const getMessages = createSelector(
  getMessagingState,
  state => Object.values<Message>(state.messages)
    .sort((first, second) => compareAsc(first.timestamp, second.timestamp))
);

export const getMessageIds = createSelector(
  getMessagingState,
  state => state.messageIds
);

export const getAutoDismiss = createSelector(
  getMessagingState,
  state => state.autoDismiss
);
