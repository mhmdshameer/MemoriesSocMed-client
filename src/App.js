import React from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const theme = createTheme();

const App = () => {
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </Container>
    </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
