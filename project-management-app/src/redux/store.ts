import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localizationReducers from './reducers/localizatonSlice';

const rootReducer = combineReducers({ localizationReducers });

export const setupStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
