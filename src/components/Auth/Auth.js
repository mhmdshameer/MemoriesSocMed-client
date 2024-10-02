import {
  Avatar,
  Button,
  Container,
  createTheme,
  Grid2,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useStyle from "./style";
import { LockOutlined } from "@mui/icons-material";
import Input from "./input";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();
  const theme = createTheme();
  const handleChange = () => {};
  const handleSubmit = () => {};
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const googleSuccess = async (res) => {
    const result = jwtDecode(res?.credential);
    const token = res?.credential
    try {
      dispatch({type: 'AUTH', data: {result, token}})

      navigate('/');
    } catch (error) {
      console.log(error)
    }
  } 
  const googleFailure = async (err) => {

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid2 container fullWidth spacing={2}>
              {isSignup && (
                <>
                  <div>
                    <GoogleLogin
                      onSuccess={googleSuccess}
                      onFailure = {googleFailure}
                    />
                  </div>
                  <Input
                    name="firstname"
                    label="First Name"
                    fullWidth
                    handleChange={handleChange}
                    half
                  />
                  <Input
                    name="secondname"
                    label="Second Name"
                    fullWidth
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                fullWidth
                handleChange={handleChange}
                type="input"
              />
              <Input
                name="password"
                label="Password"
                fullWidth
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  fullWidth
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid2>
            <Grid2 className={classes.submit}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {isSignup ? "Sign Up" : "Sign In"}{" "}
              </Button>
            </Grid2>
            <Grid2 container justify="flex-end">
              <Grid2 item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already has an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
