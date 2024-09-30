import { Visibility, VisibilityOff } from '@mui/icons-material';
import {  Grid2, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const Input = ({ name, half, handleChange, label, autoFocus, type, handleShowPassword }) => (
  <Grid2 item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      slotProps={{
        input: name === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  </Grid2>
);

export default Input;
