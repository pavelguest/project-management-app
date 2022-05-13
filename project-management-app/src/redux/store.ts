import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localizationReducers from './reducers/localizatonSlice';
import boardReducers from './reducers/boardsSlice';
import authReducers from './reducers/authSlice';

const rootReducer = combineReducers({ localizationReducers, authReducers, boardReducers });
export const setupStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
