import React, { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { Container, Paper, Grid, Typography, TextField, Button } from '@mui/material';

const RegisterLogin = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
  });

  const [loginData, setLoginData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // const handleRegisterSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to send registration data to the server
  //   console.log('Register:', registerData);
  // };

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to send login data to the server
  //   console.log('Login:', loginData);
  // };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
    <NavLink to={"/Home"} className="text-3xl font-bold">To Main Page 🏡</NavLink> <br /><br />
      <Grid container spacing={2}>
        {/* Register Form */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Register
          </Typography>
          {/* <form onSubmit={handleRegisterSubmit}> */}
          <form>
            {/* Add more form fields as needed */}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              name="address"
              value={registerData.address}
              onChange={handleRegisterChange}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              name="city"
              value={registerData.city}
              onChange={handleRegisterChange}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phoneNumber"
              value={registerData.phoneNumber}
              onChange={handleRegisterChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Grid>

        {/* Login Form */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          {/* <form onSubmit={handleLoginSubmit}> */}
          <form>
            {/* Username or Email field */}
            <TextField
              label="Username or Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="usernameOrEmail"
              value={loginData.usernameOrEmail}
              onChange={handleLoginChange}
            />
            {/* Password field */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterLogin;
