import { useEffect, useState } from 'react';
import { User, UserData } from '../../../stores/userStore/types';
import './userform.css';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, TextField } from '@mui/material';

interface UserFormProps {
  user: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const { userStore, modalStore } = rootStore;
  const [formData, setFormData] = useState<UserData>({ username: '', email: '', roles: [] });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        roles: user.roles,
      });
    }
  }, [user]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = user ? { ...user, ...formData } : { ...formData };

    if (modalStore.mode === 'edit') {
      await userStore.updateUser(userData);
    } else {
      await userStore.createUser(userData);
    }
    userStore.fetchAllUsers();
    modalStore.closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="user-form" onSubmit={handleFormSubmit}>
      <h2>Update user</h2>

      <TextField
        className="text-field"
        variant="filled"
        type="text"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <TextField
        className="text-field"
        variant="filled"
        type="emil"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <Button variant="contained" type="submit">
        Update user
      </Button>
      <CancelButton onClick={() => userStore.fetchAllUsers()} />
    </form>
  );
};

export default UserForm;
