import { combineReducers} from 'redux';
import cartReducer from './cartReducer';
import loginReducer from './loginReducer';
import registrationReducer from './registrationReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  login: loginReducer,
  registration: registrationReducer,
});

export default rootReducer;
