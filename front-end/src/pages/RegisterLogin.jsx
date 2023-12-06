import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Rating,
  Button,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RegisterLogin = () => {

  return (
    <>
        <form>
            <TextField
            label="Your Name"
            name="name"
            value={newReview.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Rating"
            name="rating"
            value={newReview.rating}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Kritik"
            name="kritik"
            value={newReview.kritik}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            />
            <TextField
            label="Saran"
            name="saran"
            value={newReview.saran}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmitReview}>
            Submit
            </Button>
        </form>
    </>
  )
}

export default RegisterLogin;
