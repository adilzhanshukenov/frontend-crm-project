import { FormEvent } from 'react';
import './stagecard.css';
import { Stage } from '../../../stores/stageStore/types';
import { Card, CardContent, CardHeader } from '@mui/material';
import EditIconButton from '../../shared/buttons/edit-icon-button/EditIconButton';
import DeleteIconButton from '../../shared/buttons/delete-icon-button/DeleteIconButton';
import styled from '@emotion/styled';

interface StageCardProps {
  stage: Stage;
  onEdit: () => void;
  onDelete: () => void;
}

const HoverCard = styled(Card)({
  backgroundColor: 'rgb(242, 242, 242)',
});

const StageCard: React.FC<StageCardProps> = ({ stage, onEdit, onDelete }) => {
  return (
    <HoverCard className="stage-card">
      <CardHeader
        title={stage?.name}
        action={
          <div className="card-buttons">
            <EditIconButton
              title="Edit"
              onClick={(e: FormEvent) => {
                e.preventDefault();
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
        <p>Description: {stage?.description}</p>
      </CardContent>
    </HoverCard>
  );
};

export default StageCard;
