import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/auth';
import './registration.css';

const Registration: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(username, password, email);
      navigate('/auth/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="registration-wrapper">
      <h1 className="registration-title">Registration</h1>
      <form className="registration-form " onSubmit={handleRegistration}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
