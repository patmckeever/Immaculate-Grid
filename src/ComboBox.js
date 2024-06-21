import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import data from './players.json';



export default function ComboBox() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (event, newValue) => {
    setSelectedItem(newValue);
    console.log(newValue)
  
  };
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list}
      sx={{ width: 300 }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Player" />}
    />
  );
}

const list = [];
data.forEach(player => {
  const p = {label: player.name, year: "(2021-present)"};
  list.push(p)
});