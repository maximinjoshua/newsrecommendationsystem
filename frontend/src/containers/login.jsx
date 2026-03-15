import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted:', { username, password });
    alert(`Welcome, ${username}!`);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
