import { Message } from '../models/message.interface';

export interface MessagingState {
  messageIds: string[];
  messages: {
    [key: string]: Message
  };
  autoDismiss: boolean;
}

export const initialState: MessagingState = {
  messageIds: [],
  messages: {},
  autoDismiss: true,
};
