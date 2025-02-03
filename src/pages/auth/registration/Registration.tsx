import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from '../../../services/auth';
import './registration.css';
import { Button, TextField } from '@mui/material';

const Registration: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(username, password, email, name, surname);
      navigate('/auth/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="registration-wrapper">
      <h1 className="registration-title">Registration</h1>
      <form className="registration-form " onSubmit={handleRegistration}>
        <TextField
          required
          variant="outlined"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />
        <TextField
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          label="Password"
        />
        <TextField
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
        />
        <TextField
          required
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="outlined"
        />
        <TextField
          required
          type="surname"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          label="Surname"
          variant="outlined"
        />

        <Button variant="contained" type="submit">
          Register
        </Button>
        <p>
          Have an account? <NavLink to="/auth/login">Log in</NavLink>
        </p>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
