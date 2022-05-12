import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localizationReducers from './reducers/localizatonSlice';
import boardReducers from './reducers/boardsSlice'

const rootReducer = combineReducers({ localizationReducers, boardReducers });

export const setupStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
