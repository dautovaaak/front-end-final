
import { CartState } from './reducers/cartReducer'; 
import { createStore } from 'redux';
import rootReducer from './reducers'; 
export interface RootState {
  cart: CartState;
  loggedInUser: {
    username: string;
    email: string;
  } | null;
}

const store = createStore(rootReducer);

export default store;
