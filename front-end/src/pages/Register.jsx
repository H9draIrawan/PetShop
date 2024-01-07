import { NavLink, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import bgRegister from '../assets/bgRegister.svg';
import bgRegDog from '../assets/bgRegDog.svg';
import bgRegCat from '../assets/bgRegCat.svg';
import bgRegKiri from '../assets/bgRegKiri.svg';
import Navbar from "../components/Navbar";
import {useAuth} from "../components/Auth"

const Register = () => {
  const {login} = useAuth();
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    password: '',
    alamat: '',
    kota: '',
    no_hp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password || !formData.alamat || !formData.kota || !formData.no_hp) {
      alert('Please fill in all fields');
      return;
    }

    try{
      const response = await axios.post('http://localhost:3000/static/api/user/register', {
        username,
        email,
        password,
        alamat,
        kota,
        no_hp
      });
      console.log("a");

      // Check if the backend response contains authentication data
      if (response.data && response.data.token) {
        login(response.data);

        // Optionally, you may redirect the user to a different page or perform other actions
      } else {
        console.error('Registration failed. Authentication data not received.');
      }

      // Clear form data after submission
      setFormData({
        username: '',
        email: '',
        password: '',
        alamat: '',
        kota: '',
        no_hp: '',
      });
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
    }

    console.log('Registration form submitted:', formData);
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
        <Container component="main" maxWidth="xs" style={{ marginTop: 30 }}>
          <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                label="Nama"
                variant="outlined"
                margin="normal"
                fullWidth
                type="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required />
              <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                required />
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required />
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required />
              <TextField
                label="Alamat"
                variant="outlined"
                margin="normal"
                fullWidth
                type="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required />
              <TextField
                label="Kota"
                variant="outlined"
                margin="normal"
                fullWidth
                type="kota"
                name="kota"
                value={formData.kota}
                onChange={handleChange}
                required />
              <TextField
                label="Nomor Telepon"
                variant="outlined"
                margin="normal"
                fullWidth
                type="no_hp"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange}
                required />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>
                Register
              </Button>
            </form>
          </Paper>
          <Typography variant="body2" style={{ marginTop: 10, textAlign: 'right' }}>
            Sudah punya akun?{' '}
            <NavLink component={NavLink} to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
              Login
            </NavLink>
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Register;