import {useState, useEffect} from 'react'
import { getAllUsers, getUserProfile, UserProfile } from '../../services/auth'
import { useNavigate } from 'react-router-dom';


const Dashboard: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [users, setUsers] = useState<UserProfile[] | null>(null)
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            //console.log(token)
            if(!token) {
                navigate('auth/login');
                return
            }

            try {
                const response = await getAllUsers(token);
                console.log(response)
                setUsers(response.data)
            } catch(err) {
                setError('Failed to fetch user profile.')
                localStorage.removeItem('token'); // remove invalid token
                navigate('auth/login'); //navigate to login page
            }
        }

        fetchProfile();

    }, [navigate])

    if(error) {
        <div>{error}</div>
    }

    if(!user) {
        <div>Loading...</div>
    }

    return(
        <div>
            <h1>Users</h1>
            <ul>
                {users?.map(user => (
                <li >
                    {user.username} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;