import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './LocalizationSelect.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLocale } from '../../redux/reducers/localizatonSlice';
import { GB, RU } from 'country-flag-icons/react/3x2';

export const LocalizationSelect = () => {
  const dispatch = useAppDispatch();
  const { locale } = useAppSelector((state) => state.localizationReducers);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setLocale(event.target.value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
        {/* <InputLabel id="localization-label">Age</InputLabel> */}
        <Select
          labelId="localization-select-label"
          id="localization-select"
          defaultValue={locale}
          value={locale}
          onChange={handleChange}
          autoWidth
          style={{
            color: 'white',
          }}
          // label="Age"
        >
          <MenuItem value={'en'}>
            <GB className="flag" />
          </MenuItem>
          <MenuItem value={'ru'}>
            <RU className="flag" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
