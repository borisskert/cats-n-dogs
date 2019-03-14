import { Message } from '../models/message.interface';

export interface MessagingState {
  messages: Message[];
}

export const initialState: MessagingState = {
  messages: [],
};
