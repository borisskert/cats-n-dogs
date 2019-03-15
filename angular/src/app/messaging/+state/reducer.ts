import { initialState, MessagingState } from './contract';
import { MessagingAction, MessagingActionTypes } from './actions';

export function reducer(state = initialState, action: MessagingAction): MessagingState {
  switch (action.type) {
    case MessagingActionTypes.NewMessage: {
      return {
        ...state,
        messageIds: [
          ...state.messageIds,
          action.payload.id
        ],
        messages: {
          ...state.messages,
          [action.payload.id]: action.payload
        }
      };
    }

    case MessagingActionTypes.CloseMessage: {
      return {
        ...state,
        messageIds: state.messageIds.filter(id => id !== action.payload),
      };
    }

    case MessagingActionTypes.FixMessage: {
      return {
        ...state,
        autoDismiss: false,
      };
    }

    case MessagingActionTypes.UnfixMessage: {
      return {
        ...state,
        autoDismiss: true,
      };
    }

    default:
      return state;
  }
}
