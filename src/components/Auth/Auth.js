import {
  Avatar,
  Button,
  Container,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LockOutlined } from "@mui/icons-material";
import Input from "./input"; // Ensure this file name matches the casing
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/auth";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccess = async (res) => {
    const result = jwtDecode(res?.credential);
    const token = res?.credential;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = async (err) => {
    console.log(err);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form onSubmit={handleSubmit} sx={{ width: '100%', marginTop: 2 }}>
          <Grid2 container spacing={2}>
            {isSignup && (
              <>
                <Grid2 item xs={12}>
                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <Input
                    name="firstName"
                    label="First Name"
                    fullWidth
                    handleChange={handleChange}
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <Input
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    handleChange={handleChange}
                  />
                </Grid2>
              </>
            )}
            <Grid2 item xs={12}>
              <Input
                name="email"
                label="Email Address"
                fullWidth
                handleChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={12}>
              <Input
                name="password"
                label="Password"
                fullWidth
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            </Grid2>
            {isSignup && (
              <Grid2 item xs={12}>
                <Input
                  fullWidth
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              </Grid2>
            )}
          </Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid2 container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid2 item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
