import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/localizationSliceType';

const initialState: IInitialState = {
  locale: 'en',
};

export const localizationSlice = createSlice({
  name: 'localizaton',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});

export default localizationSlice.reducer;
export const { setLocale } = localizationSlice.actions;
