import { initialState, MessagingState } from './contract';
import { MessagingAction, MessagingActionTypes } from './actions';

export function reducer(state = initialState, action: MessagingAction): MessagingState {
  switch (action.type) {
    case MessagingActionTypes.NewMessage: {
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload
        ]
      };
    }

    case MessagingActionTypes.CloseMessage: {
      return {
        ...state,
        messages: [
        ...state.messages.filter(message => message.id !== action.payload)
        ]
      };
    }

    default:
      return state;
  }
}
