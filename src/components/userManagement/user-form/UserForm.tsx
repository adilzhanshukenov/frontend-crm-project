import { useEffect, useState } from 'react';
import { User, UserData } from '../../../stores/userStore/types';
import './userform.css';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { userStore } from '../../../stores/userStore/UserStore';
import CancelButton from '../../shared/cancel-button/CancelButton';

interface UserFormProps {
  user: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
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
      <div className="user-form-inputs">
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div className="user-form-inputs">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <button type="submit">Update user</button>
      <CancelButton />
    </form>
  );
};

export default UserForm;
