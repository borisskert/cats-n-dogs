import { Action } from '@ngrx/store';
import { Message } from '../models/message.interface';

export enum MessagingActionTypes {
  NewMessage = '[Messaging] New Message',
  CloseMessage = '[Messaging] Close Message',
  FixMessage = '[Messaging] Fix Message',
  UnfixMessage = '[Messaging] Unfix Message',
  AutoDismissMessages = '[Messaging] Auto Dismiss Message',
  DismissMessages = '[Messaging] Dismiss Messages',
}

export type MessagingAction =
  | NewMessage
  | CloseMessage
  | FixMessage
  | UnfixMessage
  | AutoDismissMessages
  | DismissMessages
  ;

export class NewMessage implements Action {
  readonly type = MessagingActionTypes.NewMessage;

  constructor(public payload: Message) {}
}

export class CloseMessage implements Action {
  readonly type = MessagingActionTypes.CloseMessage;

  constructor(public payload: string) {}
}

export class FixMessage implements Action {
  readonly type = MessagingActionTypes.FixMessage;

  constructor(public payload: string) {}
}

export class UnfixMessage implements Action {
  readonly type = MessagingActionTypes.UnfixMessage;

  constructor(public payload: string) {}
}

export class AutoDismissMessages implements Action {
  readonly type = MessagingActionTypes.AutoDismissMessages;
}

export class DismissMessages implements Action {
  readonly type = MessagingActionTypes.DismissMessages;

  constructor(public payload: string[]) {}
}
