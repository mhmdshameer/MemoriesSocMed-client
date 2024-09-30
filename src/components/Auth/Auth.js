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
import useStyle from "./style";
import { LockOutlined } from "@mui/icons-material";
import Input from "./input";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isSignup = true;
  const classes = useStyle();
  const theme = createTheme();
  const handleChange = () => {};
  const handleSubmit = () => {};
  const switchMode = () => {};
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
            <Grid2 container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstname"
                    label="First Name"
                    handleChange={handleChange}
                    half
                  />
                  <Input
                    name="secondname"
                    label="Second Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="input"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid2>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}{" "}
            </Button>
            <Grid2 container justify="flex-end">
                <Grid2 item>
                    <Button onClick={switchMode}>
                        {isSignup? "Already has an account? Sign In": "Don't have an account? Sign Up"}
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
