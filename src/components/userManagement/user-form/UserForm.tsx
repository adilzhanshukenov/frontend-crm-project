import { useEffect, useState } from 'react';
import { User, UserData } from '../../../stores/userStore/types';
import Button from '../../shared/button/Button';
import './userform.css';

interface UserFormProps {
  user?: User | null;
  onSubmit: (user: User) => void;
  handleClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, handleClose }) => {
  const [formData, setFormData] = useState<UserData>({ username: '', email: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = user ? { ...user, ...formData } : { ...formData };
    onSubmit(userData);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
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
      <Button title="Cancel" onClick={handleClose} />
    </form>
  );
};

export default UserForm;
