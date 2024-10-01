import React from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const theme = createTheme();

const App = () => {
  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId="316534368346-g3jd1j3b93hjgj5ohagcj4ml9r1r7gjc.apps.googleusercontent.com">
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
        </ThemeProvider>
    </GoogleOAuthProvider>
      </BrowserRouter>
  );
};
export default App;
