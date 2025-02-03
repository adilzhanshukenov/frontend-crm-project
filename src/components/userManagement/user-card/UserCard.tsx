import { FormEvent } from 'react';
import { User } from '../../../stores/userStore/types';
import './usercard.css';
import { Card, CardContent, CardHeader } from '@mui/material';
import DeleteIconButton from '../../shared/buttons/delete-icon-button/DeleteIconButton';
import EditIconButton from '../../shared/buttons/edit-icon-button/EditIconButton';
import styled from '@emotion/styled';
import { ProjectUser } from '../../../stores/projectStore/types';

interface UserCardProps {
  user: User;
  projectUser?: ProjectUser;
  onEdit: () => void;
  onDelete: () => void;
}

const HoverCard = styled(Card)({
  backgroundColor: 'rgb(242, 242, 242)',
});

const UserCard: React.FC<UserCardProps> = ({ user, projectUser, onEdit, onDelete }: UserCardProps) => {
  return (
    <HoverCard variant="outlined">
      <CardHeader
        title={user.name + ' ' + user.surname}
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
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        {projectUser && (
          <div>
            <p>Position: {projectUser?.position.name}</p>
            <p>Role: {projectUser?.role}</p>
          </div>
        )}
      </CardContent>
    </HoverCard>
  );
};

export default UserCard;
