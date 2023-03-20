import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { history } from '../utils';
import rootSaga from './rootSaga';

// ----------------------------------------------------------------------
const rootReducer = combineReducers({
  router: connectRouter(history)
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export const  AppDispatch = typeof store.dispatch;
// export const  RootState = typeof store.getState;
// export const  AppThunk = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;