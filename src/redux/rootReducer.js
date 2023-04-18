import { combineReducers } from 'redux';
import authReducer from './modules/admin/authenticate/authSlice';
import { menuReducer } from './modules/admin/menu/menuSlice';
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
});

export { rootPersistConfig, rootReducer };