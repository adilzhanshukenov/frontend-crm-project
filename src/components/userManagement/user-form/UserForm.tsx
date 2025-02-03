import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { User, UserData } from '../../../stores/userStore/types';
import './userform.css';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import rootStore from '../../../stores/rootStore/RootStore';

interface UserFormProps {
  user: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const { userStore, modalStore } = rootStore;
  const [formData, setFormData] = useState<UserData>({ username: '', email: '', name: '', surname: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
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
        variant="outlined"
        type="text"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <TextField
        className="text-field"
        variant="outlined"
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        className="text-field"
        variant="outlined"
        type="text"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        className="text-field"
        variant="outlined"
        type="text"
        label="Surname"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
      />
      <div className="modal-buttons">
        <Button variant="contained" type="submit">
          Update user
        </Button>
        <CancelButton onClick={() => userStore.fetchAllUsers()} />
      </div>
    </form>
  );
};

export default UserForm;
