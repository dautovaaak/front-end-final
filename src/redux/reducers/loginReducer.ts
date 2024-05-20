import { Action } from 'redux';

interface LoginAction extends Action {
  type: 'LOGIN_USER';
  payload: any;
}

const initialState = {
  loggedInUser: null,
};

const loginReducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        loggedInUser: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
