import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/localizationSliceType';

const initialState: IInitialState = {
  locale: 'en',
};

export const localizationSlice = createSlice({ name: 'localizaton', initialState, reducers: {} });

export default localizationSlice.reducer;
