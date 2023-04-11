import { combineReducers } from 'redux';
import authReducer from './modules/authenticate/authSlice';
import {menuReducer} from './modules/menu/menuSlice';
import tripReducer from './modules/trip/tripSlice';
import userReducer from './modules/user/userSlice';
import storage from 'redux-persist/lib/storage';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  user: userReducer,
  trip: tripReducer
});

export { rootPersistConfig, rootReducer };