// Register.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate  // Import useHistory
import axios from 'axios';  // Import useHistory
const API_URL = 'https://beyond-ass-v45w.vercel.app/api'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await axios.post('${API_URL}/login', {
        username,
        password,
      });

      if (response.data.success) {
        alert('Registration successful!');
        // Redirect or perform other actions upon successful registration
        navigate('/login');
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occurred during registration.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
