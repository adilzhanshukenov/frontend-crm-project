import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {login} from '../../services/auth'
import './login.css'

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            //console.log(response);
            localStorage.setItem('token', response.data.access_token);
            navigate('/users');
        }catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='login-wrapper'>
            <h1 className='project-title'>CRM-PROJECT</h1>
            <form className='login-form' onSubmit={handleLogin}>
                <input
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login