import { FormEvent } from 'react';
import { Stage } from '../../../stores/stageStore/types';
import Button from '../../shared/button/Button';
import './stagecard.css';

interface StageCardProps {
  stage: Stage;
  onEdit: () => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, onEdit }) => {
  return (
    <div className="stage-card">
      <div>
        <h3>{stage.name}</h3>
        <p>{stage.description}</p>
      </div>
      <div>
        <Button
          title="Edit"
          onClick={(e: FormEvent) => {
            e.preventDefault();
            onEdit();
          }}
        />
      </div>
    </div>
  );
};

export default StageCard;
