import { FormEvent } from 'react';
import { User } from '../../../stores/userStore/types';
import './usercard.css';
import { Card, CardContent, CardHeader } from '@mui/material';
import DeleteIconButton from '../../shared/buttons/delete-icon-button/DeleteIconButton';
import EditIconButton from '../../shared/buttons/edit-icon-button/EditIconButton';
import styled from '@emotion/styled';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const HoverCard = styled(Card)({
  backgroundColor: 'rgb(242, 242, 242)',
});

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <HoverCard variant="outlined">
      <CardHeader
        title={user.username}
        action={
          <div className="card-buttons">
            <EditIconButton
              title="Edit"
              onClick={(e: FormEvent) => {
                e.stopPropagation();
                onEdit();
              }}
            />
            <DeleteIconButton
              title="Delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          </div>
        }
      ></CardHeader>
      <CardContent>
        <p>Email: {user.email}</p>
        <p>Roles: {user.roles}</p>
      </CardContent>
    </HoverCard>
  );
};

export default UserCard;
