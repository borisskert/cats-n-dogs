import { Action } from '@ngrx/store';
import { Message } from '../models/message.interface';

export enum MessagingActionTypes {
  NewMessage = '[Messaging] New Message',
  CloseMessage = '[Messaging] Close Message',
}

export type MessagingAction =
  | NewMessage
  | CloseMessage
  ;

export class NewMessage implements Action {
  readonly type = MessagingActionTypes.NewMessage;

  constructor(public payload: Message) {}
}

export class CloseMessage implements Action {
  readonly type = MessagingActionTypes.CloseMessage;

  constructor(public payload: string) {}
}
