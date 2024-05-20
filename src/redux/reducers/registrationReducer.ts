import { Action } from 'redux';

interface RegisterUserAction extends Action {
  type: 'REGISTER_USER';
  payload: any; 
}

const initialState = {
  users: [],
};

const registrationReducer = (state = initialState, action: RegisterUserAction) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default registrationReducer;
