import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { history } from '../utils/history';
import rootSaga from './rootSage';
// project import
import {menuReducer} from './modules/menu/menuSlice';

// ----------------------------------------------------------------------
const rootReducer = combineReducers({
  router: connectRouter(history),
  menu:  menuReducer 
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export const  AppDispatch = store.dispatch;
export const  RootState = store.getState;
// export const  AppThunk = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;