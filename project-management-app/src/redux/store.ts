import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localizationReducers from './reducers/localizatonSlice';
import boardReducers from './reducers/boardsSlice';
import authReducers from './reducers/authSlice';
import columnReducers from './reducers/columnSlice';

const rootReducer = combineReducers({
  localizationReducers,
  authReducers,
  boardReducers,
  columnReducers,
});
export const setupStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
