import { FormEvent } from 'react';
import { Position } from '../../../stores/positionStore/types';
import './positioncard.css';
import { Card, CardContent, CardHeader } from '@mui/material';
import EditIconButton from '../../shared/buttons/edit-icon-button/EditIconButton';
import DeleteIconButton from '../../shared/buttons/delete-icon-button/DeleteIconButton';
import styled from '@emotion/styled';

interface PositionCardProps {
  position: Position;
  onEdit: () => void;
  onDelete: () => void;
}

const HoverCard = styled(Card)({
  backgroundColor: 'rgb(242, 242, 242)',
});

const PositionCard: React.FC<PositionCardProps> = ({ position, onEdit, onDelete }) => {
  return (
    <HoverCard className="position-card">
      <CardHeader
        title={position.name}
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
              onClick={(e: FormEvent) => {
                e.preventDefault();
                onDelete();
              }}
            />
          </div>
        }
      ></CardHeader>
      <CardContent>
        <p>{position.description}</p>
      </CardContent>
    </HoverCard>
  );
};

export default PositionCard;
