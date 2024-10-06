import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import App from "./App";
import { AppBar,  } from "@mui/material";


const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppBar 
      position="static" 
      sx={{
        borderRadius: 2,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
        />
    <App />
  </Provider>
);
