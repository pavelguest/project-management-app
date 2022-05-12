import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBoardForm } from '../../types/headerTypes';

export const fetchBoardsPostAll = createAsyncThunk(
  'boards/postAll',
  async (data: IBoardForm, thunkAPI) => {
    try {
      const response = await axios.post('https://app-management-final.herokuapp.com/boards', {
        title: data.title,
        id: data.id,
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(`${e}`);
    }
  }
);
