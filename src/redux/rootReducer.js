import { combineReducers } from 'redux';
import authReducer from './modules/authenticate/authSlice';
import {menuReducer} from './modules/menu/menuSlice';
import tripReducer from './modules/trip/tripSlice';
import tripMemberReducer from './modules/trip/member/tripMemberSlice';
import tripPlanReducer from './modules/trip/plan/tripPlanSlice';
import tripRoleReducer from './modules/trip/role/tripRoleSlice';
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
  trip: tripReducer,
  tripMember: tripMemberReducer,
  tripPlan: tripPlanReducer,
  tripRole: tripRoleReducer,
});

export { rootPersistConfig, rootReducer };