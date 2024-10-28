import { FormEvent } from 'react';
import { User } from '../../../stores/userStore/types';
import Button from '../../shared/button/Button';
import './usercard.css';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <p>{user.username}</p>
      <div>
        <Button
          title="Edit"
          onClick={(e: FormEvent) => {
            e.stopPropagation();
            onEdit();
          }}
        />
        <Button
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};

export default UserCard;
