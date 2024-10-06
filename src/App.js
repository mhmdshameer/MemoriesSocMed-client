import React from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route,  Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";
import PostDetails from "./components/PostDetails/PostDetails";

const theme = createTheme();

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
              <Route path="/posts" element={<Home />} />
              <Route path="/posts/search" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/auth" element={ user ? <Navigate to="/posts" />: <Auth /> } />
              <Route path="/form" element={<Form />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};
export default App;
