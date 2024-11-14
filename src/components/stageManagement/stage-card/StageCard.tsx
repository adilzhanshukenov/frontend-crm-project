import { FormEvent } from 'react';
import { Stage } from '../../../stores/stageStore/types';
import Button from '../../shared/button/Button';
import './stagecard.css';

interface StageCardProps {
  stage: Stage;
  onEdit: () => void;
  onDelete: () => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, onEdit, onDelete }) => {
  return (
    <div className="stage-card">
      <div>
        <h3>{stage.name}</h3>
        <p>{stage.description}</p>
      </div>
      <div className="card-buttons">
        <Button
          title="Edit"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            onEdit();
          }}
        />
        <Button
          title="Delete"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};

export default StageCard;
