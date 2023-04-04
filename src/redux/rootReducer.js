import { combineReducers } from 'redux';
import {menuReducer} from './modules/menu/menuSlice';
import authReducer from './modules/authenticate/authSlice';
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
  menu:  menuReducer,
  user: userReducer,
  trip: tripReducer
});

export { rootPersistConfig, rootReducer };