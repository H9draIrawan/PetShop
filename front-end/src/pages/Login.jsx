import { NavLink, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import bgRegister from '../assets/bgRegister.svg';
import Navbar from "../components/Navbar";


const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/static/api/user/login', email, username, password);
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
    {/* <Navbar /> */}
        <div
            style={{
                backgroundImage: `url(${bgRegister})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
          <Container component="main" maxWidth="xs">
              <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h5">Login</Typography>
                  <form style={{ width: '100%', marginTop: 16 }}>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  label="Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  label="Username"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  variant="outlined"
                                  required
                                  fullWidth
                                  label="Password"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)} />
                          </Grid>
                      </Grid>
                      <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={handleLogin}
                          style={{ marginTop: 16 }}
                      >
                          Login
                      </Button>
                  </form>
              </Paper>
              <Typography variant="body2" style={{ marginTop: 10, textAlign: 'right' }}>
                  Belum punya akun?{' '}
                  <NavLink component={NavLink} to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
                      Register
                  </NavLink>
              </Typography>
          </Container>
      </div>
    </>
  );
};

export default Login;
