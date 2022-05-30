import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/localizationSliceType';

const initialState: IInitialState = {
  locale: localStorage.getItem('localization')
    ? (localStorage.getItem('localization') as string)
    : 'en',
};

export const localizationSlice = createSlice({
  name: 'localizaton',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      localStorage.setItem('localization', action.payload);
      state.locale = action.payload;
    },
  },
});

export default localizationSlice.reducer;
export const { setLocale } = localizationSlice.actions;
