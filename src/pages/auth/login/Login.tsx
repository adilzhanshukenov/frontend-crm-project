import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './login.css';
import { useAuth } from '../../../context/useAuth';
import { Button, TextField } from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      const redirectUrl = searchParams.get('redirectTo') || '/companies'; // Default to dashboard
      navigate(redirectUrl, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="project-title">CRM-PROJECT</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <TextField
          className="text-field"
          label="Username"
          type="text"
          variant="outlined"
          placeholder="Type your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="text-field"
          label="Password"
          type="password"
          variant="outlined"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
