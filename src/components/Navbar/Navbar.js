import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"
import { AppBar, Avatar, Button, createTheme,  Grid2, Toolbar, Typography } from "@mui/material";
import memories from "../../images/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deepPurple } from '@mui/material/colors';  // Import deepPurple color
import { useDispatch } from "react-redux";

const theme = createTheme();

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const storedProfile = localStorage.getItem('profile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const logout = () => {
      dispatch({type: 'LOGOUT'})

      navigate("/");
      setUser(null);
  }

  useEffect(()=>{
    const token = user?.token

    if(token) {
      const decodedToken = jwtDecode(token)
    if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location, logout])

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderRadius: 2,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: '10px 50px',
        }}
      >
        <Grid2 container alignItems="center" spacing={3}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Grid2 item>
              <Typography
                component={Link}
                to="/"
                variant="h2"
                sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
              >
                Memories
              </Typography>
            </Grid2>
            <Grid2 item>
              <img
                src={memories}
                alt="memories"
                height="60"
                width="60"
                style={{ marginLeft: "15px" }}
              />
            </Grid2>
          </div>
        </Grid2>
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', width: '400px' }}>
            {user ? (
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px" }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }} src={user.result.picture} alt={user.result.name}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>{user.result.name}</Typography>
                <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button variant="contained" component={Link} to="/auth" color="primary">Sign In</Button>
            )}
          </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
