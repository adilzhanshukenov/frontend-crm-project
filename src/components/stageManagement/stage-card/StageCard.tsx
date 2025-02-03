import { FormEvent } from 'react';
import './stagecard.css';
import { ProjectStage, Stage } from '../../../stores/stageStore/types';
import { Card, CardContent, CardHeader } from '@mui/material';
import EditIconButton from '../../shared/buttons/edit-icon-button/EditIconButton';
import DeleteIconButton from '../../shared/buttons/delete-icon-button/DeleteIconButton';
import styled from '@emotion/styled';
import combineName from '../../../utils/editUtils';

interface StageCardProps {
  stage: Stage;
  projectStage?: ProjectStage;
  onEdit: () => void;
  onDelete: () => void;
}

const HoverCard = styled(Card)({
  backgroundColor: 'rgb(242, 242, 242)',
});

const StageCard: React.FC<StageCardProps> = ({ stage, projectStage, onEdit, onDelete }: StageCardProps) => {
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
        <p>
          Default user:{' '}
          {projectStage?.default_user && combineName(projectStage.default_user.name, projectStage.default_user.surname)}
        </p>
      </CardContent>
    </HoverCard>
  );
};

export default StageCard;
