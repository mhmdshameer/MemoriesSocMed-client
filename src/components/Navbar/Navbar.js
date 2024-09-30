import { ThemeProvider } from "@emotion/react";
import useStyles from "./styles.js";
import React from "react";
import { AppBar, Avatar, Button, createTheme, Grid2, Toolbar, Typography } from "@mui/material";
import memories from "../../images/memories.png";
import {Link} from "react-router-dom";
const theme = createTheme();

const Navbar = () => {
    const user = null;
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        className={classes.appBar}
        position="static"
        color="inherit"
        sx={{
          borderRadius: 2,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2 container alignItems="center" spacing={3}>
          <div className={classes.brandContainer}>
            <Grid2 item>
              <Typography
                component={Link}
                to="/"
                className={classes.heading}
                variant="h2"
                sx={{ color: "rgba(0,183,255, 1)" }}
              >
                Memories
              </Typography>
            </Grid2>
            <Grid2 item>
              <img
                className={classes.image}
                src={memories}
                alt="memories"
                height="60"
                width="60"
                style={{ marginLeft: "15px" }}
              />
            </Grid2>
          </div>
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} src={user.result.image} alt={user.result.name}>{user.result.name.charAt(0)} </Avatar>
                 <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                 <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
              </div>  
            ):(
                <Button variant="contained" component={Link} to="/auth" color="Primary" >Sign In</Button>
            )}
          </Toolbar>
        </Grid2>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
